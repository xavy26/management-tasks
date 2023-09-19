import { Router } from "express";
import passport from "passport";

import * as TaskController from "../controllers/task_controller"

const router = Router();

router.get('/get', passport.authenticate('jwt', {session: false}), TaskController.getTasks);
router.get('/:state', passport.authenticate('jwt', {session: false}), TaskController.taskByState);
router.post('/create', passport.authenticate('jwt', {session: false}), TaskController.crateTask);
router.put('/update', passport.authenticate('jwt', {session: false}), TaskController.changeState);

export default router;