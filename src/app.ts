import express, { Application } from 'express';
import { errorHandler } from './infrastructure/http/middlewares/error-handler';
import { notFoundHandler } from './infrastructure/http/middlewares/not-found';
import { securityMiddleware } from './infrastructure/http/middlewares/security';

class App {
  public express: Application;

  constructor() {
    this.express = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandlers();
  }

  private setupMiddlewares(): void {
    securityMiddleware(this.express);
  }

  private setupRoutes(): void {
    // Placeholder for future routes
    this.express.get('/', (req, res) => {
      res.send('API is running...');
    });
  }

  private setupErrorHandlers(): void {
    this.express.use(notFoundHandler);
    this.express.use(errorHandler);
  }

  public start(port: number, cb: () => void): void {
    this.express.listen(port, cb);
  }
}

export default App;