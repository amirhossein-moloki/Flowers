import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';

export const securityMiddleware = (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors()); // Configure CORS options as needed
};