const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isValidEmail, isValidBirthDate, isValidCPF, isValidRole } = require('../utils/validationsUtils');


const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { name, cpf, email, birthDate, password, role } = req.body;

  if (isValidEmail(email) === false) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  if (isValidBirthDate(birthDate) === false) {
    return res.status(400).json({ error: 'Data de nascimento inválida, você ser precisa ser maior de idade para entrar no sistema!' });
  }
  if (isValidCPF(cpf) === false) {
    return res.status(400).json({ error: 'CPF inválido' });
  }
  if (isValidRole(role) === false) {
    return res.status(400).json({ error: 'Nível de acesso inválido' });
  }

  try {
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
    res.status(500).json({ error: `Erro ao criar o usuário ${error.message}` });
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
      { expiresIn: '1h' }
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
  const { name, email, birthDate, cpf, oldPassword, newPassword } = req.body;

  if (isValidEmail(email) === false) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  if (isValidBirthDate(birthDate) === false) {
    return res.status(400).json({
      error: 'Data de nascimento inválida, você precisa ser maior de idade para entrar no sistema!',
    });
  }
  if (isValidCPF(cpf) === false) {
    return res.status(400).json({ error: 'CPF inválido' });
  }

  try {
    
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    let passwordUpdate = {};

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Senha atual incorreta.' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      passwordUpdate.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        birthDate: new Date(birthDate),
        cpf,
        ...passwordUpdate,
      },
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

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  try {
    await prisma.user.delete({ where: { id } });

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao deletar usuário' });
  }
};



module.exports = { createUser, getUsers, login, getProfile, updateUser, deleteUser };
