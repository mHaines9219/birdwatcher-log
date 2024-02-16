import express from 'express'; // ES6 import syntax
import { PORT } from './config/config.js';

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
