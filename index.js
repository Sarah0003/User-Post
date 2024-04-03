
import  express  from 'express';
import { connection } from './Database/connection.js';
import userRoutes from './src/modules/users/user.routes.js';
import taskRoutes from './src/modules/post/task.routes.js';

const app = express()
const port = 3000

app.use(express.json());
connection();
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/task",taskRoutes)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))