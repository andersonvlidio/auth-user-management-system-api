const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedAdmin() {
  const isAdminUser = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  });

  if (!isAdminUser) {
    const hashedPassword = await bcrypt.hash('admin', 10);
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@email.com',
        cpf: '00000000000',
        birthDate: new Date('1990-01-01'),
        password: hashedPassword,
        role: 'ADMIN',
        accessDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
      },
    });
    console.log('Usuário ADMIN criado com sucesso');
  } else {
    console.log('Usuário ADMIN já existe');
  }
}

module.exports = seedAdmin;
