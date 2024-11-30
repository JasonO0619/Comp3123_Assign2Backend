import express from 'express';
import mongoose from 'mongoose';
const app = express();

import userRoutes from './routes/user.js'; 
import employeeRoutes from './routes/employee.js'; 

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use('/users', userRoutes); 
app.use('/employees', employeeRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

mongoose.connect("mongodb+srv://jayopoku19:v74CbvQQRut37J0U@cluster0.xqqr4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
.catch(() => {
    console.log("Connection failed.")
});

