import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import golobalErrorHnadelar from './app/middleware/golobalErrorHnadelar';
import notFounded from './app/middleware/notFounded';
import router from './app/routes';
import cookieParser  from 'cookie-parser';

const app:Application=express();

app.use(cors({origin:"https://pat-adoption-orpin.vercel.app",credentials:true}));
//https://www.npmjs.com/package/cookie-parser
app.use(cookieParser());
// parser
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/',(req:Request,res:Response)=>{

    res.send({message:"Assigment 9 Server is Running"})


});

//username : assigmentnine
//password:uuvfpaD8lRlF8UWX
//this Application databse link : https://supabase.com/dashboard/project/ssgjhknjgnqsvqvrrdkx/editor/29158
app.use('/api/v1',router);
app.use(golobalErrorHnadelar);
app.use("*",notFounded);

export default app;