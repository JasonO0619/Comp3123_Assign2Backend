import express from 'express';
import connectDB from './config/database.js';
import userRoutes from './routes/user.js';
import employeeRoutes from './routes/employee.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/employees', employeeRoutes);

app.get('/', async (req, res) => {
    res.send('Hello, World!');
});

connectDB()
    .then(() => {
        console.log('✅ Connected to MongoDB');
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
    });

export default app;
