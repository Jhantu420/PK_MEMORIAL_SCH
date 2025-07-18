import express from 'express';
import { adminLogin, adminRegister, getAdmin, logout } from '../controllers/adminController.js';
import { verifyUser } from '../middleware/auth.js';
import { registerStudent, updateStudent } from '../controllers/studentController.js';
import { classController, deleteClass, getClass, updateClass } from '../controllers/classController.js';

const router = express.Router();

// admin route
router.post('/registerAdmin',adminRegister);
router.post('/loginAdmin',adminLogin);
router.get('/getAdmin',verifyUser,getAdmin);

//logout route
router.get('/logout',logout);

// class route
router.post('/create-class',verifyUser,classController);
router.put('/update-class/:id',verifyUser,updateClass);
router.delete('/delete-class/:id',verifyUser,deleteClass);
router.get('/get-class',getClass);

// student route
router.post('/registerStudent',registerStudent);
router.post('/registerStudent/:id',updateStudent);
export default router;