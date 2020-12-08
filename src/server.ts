//import "reflect-metadata";
import express from 'express';
import routes from './routes'; //busca do index.ts
import uploadConfig from './config/upload';
import "./database";

const app = express();

app.use(express.json());

// localhost:3333/files/1a6879e94ba974e95c4e-foto.png
app.use('/files', express.static(uploadConfig.directory)); 

app.use(routes);

app.listen(3333, () => {
  console.log("Server started on port 3333...")
})
