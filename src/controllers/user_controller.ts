import { AppDataSource } from "../database/data-source"
import { Request, Response } from "express"
import { User } from "../entities/user_entity"
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from '../config/config'

const userRepository = AppDataSource.getRepository(User)

const cryptPassword = async function (password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (passwordDB: string, password: string): Promise<boolean> => {
  return bcrypt.compare(password, passwordDB);
}

const createToken = function (user: User) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 3600 // una hora
  });
}

export const singUp = async (req: Request, res: Response): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Por favor enviar su email y contraseña'
    });
  }

  const { email, password } = req.body;
  const passCrypt = await cryptPassword(password);

  const user = Object.assign(new User(), {
    email: email,
    password: passCrypt
  });

  await userRepository.save(user);
  return res.status(201).json(user);
}

export const singIn = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Por favor enviar su email y contraseña'
    });
  }

  const { email, password } = req.body;

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: 'Usuario no existe' });
  }

  const isMatch = await comparePassword(user.password, password);

  if (isMatch) {
    const token = await createToken(user);
    return res.status(200).json({
      token: token,
      message: `Bienvenido ${user.email}`
    });
  }

  return res.status(400).json({ message: 'Verifique su contraseña' });
}