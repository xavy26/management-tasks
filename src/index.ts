import express from "express"
import morgan from "morgan";
import { Request, Response } from 'express';
import passport from "passport";

import passportMiddleware from "./middlewares/passport";
import { AppDataSource } from "./database/data-source";
import authRoutes from "./routers/auth_route";
import taskRoutes from "./routers/task_route";

 // initializations
const app = express();
const PORT = 3000;

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(passport.initialize());
passport.use(passportMiddleware);

//routes
app.use(authRoutes);
app.use('/task', taskRoutes);

// DB Connection
AppDataSource.initialize().then(() => {
    console.log('Data Source has benn initialized');
}).catch((err) => {
    console.error('Error during Data Souce initialization:', err);
});

//settings
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});