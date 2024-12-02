import express from 'express';
import {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    searchEmployee
} from '../controllers/employeeController.js'; 

const router = express.Router();

router.get('/search', searchEmployee);
router.get('/', getAllEmployees); 
router.post('/', createEmployee); 
router.get('/:eid', getEmployeeById); 
router.put('/:eid', updateEmployee); 
router.delete('/:eid', deleteEmployee); 
export default router;
