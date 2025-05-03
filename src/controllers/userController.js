const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { name, cpf, email, birthDate, password } = req.body;
  console.log('Received data:', req.body);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        cpf,
        email,
        birthDate: new Date(birthDate),
        accessDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        password,
        role: 'VISUALIZADOR',
      },
    });
    res.json(user);
  } catch (error) {
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

module.exports = { createUser, getUsers };
