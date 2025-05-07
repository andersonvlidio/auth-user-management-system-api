const app = require('./app');
const seedAdmin = require('./seedAdmin');

const PORT = process.env.PORT || 3333;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedAdmin();
});
