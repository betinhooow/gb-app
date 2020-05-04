import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const sessionService = new AuthenticateUserService();

  const { user, token } = await sessionService.execute({ email, password });

  return response.json({ user, token });
});

export default sessionsRouter;