import express, { Application } from 'express';
import {RouteHandlers} from './routes/routeHandler'

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Smart Irrigation API is running...');
});
var routeHandler:RouteHandlers = new RouteHandlers();
app.use('/api/v1', routeHandler.getRoutes());

export default app;


