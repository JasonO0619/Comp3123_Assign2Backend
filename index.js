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


app.get('/', (req, res) => {
    res.send('Hello, World!');
});


(async () => {
    try {
        await connectDB(); 
        console.log(' MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
    }
})();


export default app;
