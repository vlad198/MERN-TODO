const express = require('express');
const RegistrationRouter = require('./routers/RegistrationRouter');
const LoginRouter = require('./routers/LoginRouter');
const ToDoRouter = require('./routers/ToDoRouter');

const app = express();

const connectDB = require('./config/db');

connectDB();

app.use(express.json({extended : true}));

// ROUTES

app.use('/register',RegistrationRouter);
app.use('/login',LoginRouter);
app.use('/todos',ToDoRouter);


const PORT = process.env.PORT;

app.listen(PORT,() => console.log(`Server started at port ${PORT}`));