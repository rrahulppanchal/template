import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config';

const app = express();

app.use(cors(config.cors));
app.use(express.json());

// Routes
app.use('/api', router);

// Error handling
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(
    `API server running on port ${config.port} in ${config.nodeEnv} mode`
  );
});
