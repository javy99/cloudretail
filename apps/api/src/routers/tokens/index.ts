import express from 'express';
import { createToken } from './createToken';

export const tokensRouter = express.Router();

tokensRouter.post('/', createToken);
