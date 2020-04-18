import { Router } from 'express';
import appointmentsRouter from './appointments.route';

const routes = Router();

routes.use('/appointment', appointmentsRouter);

export default routes;
