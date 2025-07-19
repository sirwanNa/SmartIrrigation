import app from './app';
import { Server } from 'http';
import dotenv from 'dotenv';
dotenv.config();

const PORT =  process.env.PORT ? parseInt(process.env.PORT, 10) :4000;  


const server: Server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Graceful shutdown on unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  console.error(`Unhandled Rejection: ${err.message}`);

  server.close(() => {
    process.exit(1);
  });
});
