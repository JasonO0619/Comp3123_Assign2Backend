import { check, validationResult } from 'express-validator';
import Employee from '../models/Employee.js';

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const createEmployee = [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('position', 'Position is required').not().isEmpty(),
    check('salary', 'Salary must be a number').isNumeric(),
    check('date_of_joining', 'Date of joining is required').isISO8601(),
    check('department', 'Department is required').not().isEmpty(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
            const newEmployee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
            const employee = await newEmployee.save();

            res.status(201).json({ message: 'Employee created successfully.', employee_id: employee._id });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
];

export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const updateEmployee = [
    check('first_name', 'First name is required').optional().not().isEmpty(),
    check('last_name', 'Last name is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('position', 'Position is required').optional().not().isEmpty(),
    check('salary', 'Salary must be a number').optional().isNumeric(),
    check('date_of_joining', 'Date of joining is required').optional().isISO8601(),
    check('department', 'Department is required').optional().not().isEmpty(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
            if (!employee) {
                return res.status(404).json({ status: false, message: 'Employee not found' });
            }
            res.status(200).json({ message: 'Employee details updated successfully.' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
];

export const deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.query;
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};
