import express, { Application } from 'express';
import farmRoutes from './routes/farmRout'; 

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Smart Irrigation API is running...');
});
app.use('/api/v1', farmRoutes);

export default app;


