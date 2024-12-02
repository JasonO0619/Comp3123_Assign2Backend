import express from 'express';
import connectDB from './config/database.js';
import userRoutes from './routes/user.js';
import employeeRoutes from './routes/employee.js';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use('/users', userRoutes);
app.use('/employees', employeeRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
export default app;