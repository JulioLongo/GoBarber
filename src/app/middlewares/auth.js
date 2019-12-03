import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

// Checar se o usuario esta logado com o token
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Remover o bearer da token
  const [, token] = authHeader.split(' ');

  // Promissify transforma callback em async await, passa token e secret
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // console.log(decoded);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
