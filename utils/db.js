import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to MongoDB
    this.client.connect((err) => {
      if (err) {
        console.error('MongoDB connection failed:', err.message || err.toString());
      } else {
        console.log('MongoDB connected successfully');
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
    return filesCollection = this.client.db().collection('files').countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
