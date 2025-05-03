const app = require('./app');

console.log('🔥 Iniciando backend...');

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
