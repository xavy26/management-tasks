import { Request, Response } from "express";

import { AppDataSource } from "../database/data-source";
import { User } from "../entities/user_entity";
import { Task, TaskState } from "../entities/task_entity";

const userRepository = AppDataSource.getRepository(User);
const taskRepository = AppDataSource.getRepository(Task);

export const crateTask = async (req: Request, res: Response) => {
  if (!req.isAuthenticated) {
    return res.send('No is authenticate');
  }

  const { title, description } = req.body;

  if ( !title || !description ) {
    res.status(400).json({message: 'Por favor enviar titulo y descripcion'});
  }

  const task = Object.assign(new Task(), {
    title: title,
    description: description,
    user: req.user
  });

  await taskRepository.save(task);

  return res.status(201).json(task);
}

export const getTasks = async (req: Request, res: Response) => {
  if (!req.isAuthenticated) {
    res.send('Debe iniciar sesion para ingresar aqui');
  }

  console.log('User', req.authInfo);

  const tasks = await taskRepository.find({
    where: {
      user: req.user
    },
    relations: {
      user: true
    }
  });

  return res.status(200).json(tasks);
}

export const taskByState = async (req: Request, res: Response) => {
  if (!req.isAuthenticated) {
    res.send('Debe iniciar sesion para ingresar aqui');
  }

  var state = TaskState.TODO;
  switch (req.params.state) {
    case 'todo':
      state = TaskState.TODO
      break;
    case 'inprocess':
      state = TaskState.INPROCESS
      break;
    case 'completed':
      state = TaskState.COMPLETED
      break;
  }

  const tasks = await taskRepository.find( {
    where: { state },
    relations: {
      user: true
    }
  });

  return res.status(200).json(tasks);
}

export const changeState = async (req: Request, res: Response) => {
  if (!req.isAuthenticated) {
    res.send('Debe iniciar sesion para ingresar aqui');
  }

  const id = req.body.id;
  var state = TaskState.TODO;
  switch (req.body.state) {
    case 'todo':
      state = TaskState.TODO
      break;
    case 'inprocess':
      state = TaskState.INPROCESS
      break;
    case 'completed':
      state = TaskState.COMPLETED
      break;
  }

  const task = await taskRepository.findOneBy({ id });
  task.state = state;
  await taskRepository.save(task);
  res.status(200).json({
    message: 'Task has been update'
  });
}