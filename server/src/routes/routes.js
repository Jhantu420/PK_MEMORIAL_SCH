import express from 'express';
import { adminLogin, adminRegister, deleteMsg, getAdmin, getInTouchController, getInTouchisRead, getMsg, logout } from '../controllers/adminController.js';
import { verifyUser } from '../middleware/auth.js';
import { deleteStudent, getStudents, registerStudent, updateStudent } from '../controllers/studentController.js';
import { applyClass, classController, deleteClass, getClass, updateClass } from '../controllers/classController.js';
import upload from '../helper/multer.js';
import { deleteTeacher, getAllTeachers, registerTeacher, updateTeacher } from '../controllers/teacherController.js';

const router = express.Router();

// admin route
router.post('/registerAdmin',adminRegister);
router.post('/loginAdmin',adminLogin);
router.get('/getAdmin',verifyUser,getAdmin);
// get in touch route
router.post('/get-in-touch',getInTouchController);
router.post('/get-in-touch-read',verifyUser,getInTouchisRead);
router.get('/get-in-touch',verifyUser,getMsg);
router.delete('/get-in-touch/:id',verifyUser,deleteMsg);

//logout route
router.get('/logout',logout);

// class route
router.post('/create-class',verifyUser,upload.single("image"),classController);
router.post('/apply-class',applyClass);
router.put('/update-class/:id',verifyUser,upload.single("image"),updateClass);
router.delete('/delete-class/:id',verifyUser,deleteClass);
router.get('/get-class',getClass);

// teacher route
router.post('/register-teacher',verifyUser,upload.single("image"),registerTeacher);
router.put('/update-teacher/:id',verifyUser,upload.single("image"),updateTeacher);
router.delete('/delete-teacher/:id',verifyUser,deleteTeacher);
router.get('/get-teacher',getAllTeachers);

// student route
router.post('/register-student',verifyUser,upload.single("image"),registerStudent);
router.put('/update-student/:id',verifyUser,upload.single("image"),updateStudent);
router.get('/get-students',verifyUser,getStudents);
router.delete('/delete-student/:id',verifyUser,deleteStudent);
export default router;