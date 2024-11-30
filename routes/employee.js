import express from 'express';
import {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} from '../controllers/employeeController.js'; 

const router = express.Router();


router.get('/employees', getAllEmployees); 
router.post('/employees', createEmployee); 
router.get('/employees/:eid', getEmployeeById); 
router.put('/employees/:eid', updateEmployee); 
router.delete('/employees/:eid', deleteEmployee); 

export default router;
