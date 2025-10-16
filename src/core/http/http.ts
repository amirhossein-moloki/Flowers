import { Router } from 'express';

export abstract class Controller {
  public abstract readonly router: Router;
}