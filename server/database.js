const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
});

sequelize.authenticate().then(() => {
  console.log('✅ Database connected successfully...');
}).catch(err => {
  console.error('💥 Unable to connect to the database:', err);
})


module.exports = sequelize