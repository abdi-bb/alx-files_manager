import express from 'express';
import routingController from './routes/index';

const app = express();
const PORT = process.env.PORT || 5000;

// Load all routes from routes/index.js
app.use(express.json());

routingController(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
