import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user/user'
import guestRouter from './routes/guest/guest'
import { errors } from './middleware/errors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import options from './utils/swagger';
import user_locations from './middleware/user/user-locations';
const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  next();
})

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)));

app.use('/guest',guestRouter);

//optional use case
app.use(user_locations);
app.use(userRouter);

app.use(errors);

app.listen(4001);

export default app;