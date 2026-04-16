const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Tentando conectar no Mongo...');

    const conn = await mongoose.connect(
      "mongodb://al4726390_db_user:Gabriel%40123@cluster0-shard-00-00.cz7ndld.mongodb.net:27017,cluster0-shard-00-01.cz7ndld.mongodb.net:27017,cluster0-shard-00-02.cz7ndld.mongodb.net:27017/meubanco?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority",
      {
        serverSelectionTimeoutMS: 5000,
      }
    );

    console.log('✅ MongoDB conectado');
    console.log(`Host: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:');
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;