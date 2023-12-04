import dbClient from '../utils/db';
import sha1 from 'sha1';

class UsersController {
  // Other controller methods...

  static async postNew(req, res) {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if email already exists in the database
    const existingUser = await dbClient.client.db().collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password using SHA1
    const hashedPassword = sha1(password);

    // Create a new user
    const newUser = {
      email,
      password: hashedPassword,
    };

    // Insert the new user into the database
    const result = await dbClient.client.db().collection('users').insertOne(newUser);

    // Return the new user with only the email and id
    const responseUser = {
      id: result.insertedId,
      email,
    };

    return res.status(201).json(responseUser);
  }
}

export default UsersController;
