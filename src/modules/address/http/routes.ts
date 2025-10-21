import { Router } from 'express';
import { AddressController } from './controller';
import { AddressDependencies } from '../address.dependencies';
import { isAuthenticated } from '@/core/middlewares/auth.middleware';

export const createAddressRoutes = (dependencies: AddressDependencies): Router => {
    const router = Router();
    const controller = new AddressController(dependencies);

    router.use(isAuthenticated);

    router.post('/', (req, res) => controller.create(req, res));
    router.get('/', (req, res) => controller.list(req, res));
    router.get('/:id', (req, res) => controller.findById(req, res));
    router.put('/:id', (req, res) => controller.update(req, res));
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
}
