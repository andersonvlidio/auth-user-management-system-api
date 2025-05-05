const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { name, cpf, email, birthDate, password, role } = req.body;

  try {
    console.log('Received data:', req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        cpf,
        email,
        birthDate: new Date(birthDate),
        password: hashedPassword,
        role,
        accessDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar o usuário' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os usuários' });
  }
};

const login = async (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'chave_jwt',
      { expiresIn: '5h' }
    );

    const { password: _, cpf, ...userData } = user;

    res.json({ token, user: userData });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno ao fazer login' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        name: true,
        id: true,
        cpf: true,
        email: true,
        role: true,
        birthDate: true,
        createdAt: true,
        password: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, birthDate, cpf } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, birthDate: new Date(birthDate), cpf },
    });

    const { password, ...userSafe } = updatedUser;
    res.json(userSafe);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id } });

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao deletar usuário' });
  }
};



module.exports = { createUser, getUsers, login, getProfile, updateUser, deleteUser };
