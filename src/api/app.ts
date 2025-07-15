import express, { Application } from 'express';
import farmRoutes from './routes/farmRoute'; 
import fieldRoutes from './routes/fieldRoute'; 
import sensorRoutes from './routes/sensorRoute'; 
import sensorLogRoutes from './routes/sensorLogRoute'; 
import plantGrowthRoutes from './routes/plantGrowthRoute'; 
import irrigationLogRoutes from './routes/irrigationLogRoute'; 

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Smart Irrigation API is running...');
});
app.use('/api/v1', farmRoutes);
app.use('/api/v1', fieldRoutes);
app.use('/api/v1', sensorRoutes);
app.use('/api/v1', sensorLogRoutes);
app.use('/api/v1', plantGrowthRoutes);
app.use('/api/v1', irrigationLogRoutes);

export default app;


