const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb://localhost:27017';
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db('tododb');

    // Create the 'todos' collection if it doesn't exist
    await db.createCollection('todos');
    
    console.log('Connected to MongoDB and created "todos" collection');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

const getDB = () => {
  return db;
};

module.exports = { connectDB, getDB };