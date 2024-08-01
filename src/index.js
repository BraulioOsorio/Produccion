import express from "express";
import root_router from "./routes/index.routes.js";
import logger from "morgan";
import { createServer as create_server } from 'node:http';
import cors_config from "./core/config/cors_config.js";
import { cors_socket } from "./core/config/cors_socket.js";
import { PORT } from "./core/config/config.js";
import {initialize_web_socket} from './websocket.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = create_server(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logger('dev'));
app.use(express.json());
app.use(cors_config);
app.use('/collaborative_chat', root_router);
const uploadsPath = path.join(__dirname, '../public/uploads');
app.use('/uploads', express.static(uploadsPath));

initialize_web_socket(server, cors_socket);

server.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});

export default app;
