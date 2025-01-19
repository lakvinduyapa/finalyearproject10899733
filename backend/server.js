import http from 'http';
import app from './app/app.js';

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(PORT, console.log(`Server up and running on port ${PORT}`));