const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { name, cpf, email, birthDate, password } = req.body;

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
        role: 'VISUALIZADOR',
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
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    console.log('Senha enviada:', password);
    console.log('Hash armazenado:', user.password);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'chave_jwt',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno ao fazer login' });
  }
};

module.exports = { createUser, getUsers, login };
