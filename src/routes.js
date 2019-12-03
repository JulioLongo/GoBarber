import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Criar users e iniciar sessão
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Rotas que precisam de auth.
routes.use(authMiddleware);

// Atualizar user
routes.put('/users', UserController.update);

// Retorna os providers
routes.get('/providers', ProviderController.index);

// Enviar imagem
routes.post('/files', upload.single('file'), FileController.store);

// Pegar agendamentos do usuário e criar
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

// Lista os agendamento na visão do prestador
routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
