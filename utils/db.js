import { MongoClient } from 'mongodb';

const DEFAULT_DB_HOST = 'localhost';
const DEFAULT_DB_PORT = 27017;
const DEFAULT_DB_DATABASE = 'files_manager';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || DEFAULT_DB_HOST;
    const port = process.env.DB_PORT || DEFAULT_DB_PORT;
    const database = process.env.DB_DATABASE || DEFAULT_DB_DATABASE;

    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.isClientConnected = false;

    this.client.connect((err) => {
      if (err) {
        console.error('MongoDB connection failed:', err.message || err.toString());
        this.isClientConnected = false;
      } else {
        console.log('MongoDB connection established.');
        this.isClientConnected = true;
      }
    });
  }

  // Check if the connection to MongoDB is successful
  isAlive() {
    return !!this.client && this.client.isConnected();
  }

  // Get the number of documents in the users collection
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // Get the number of documents in the files collection
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
