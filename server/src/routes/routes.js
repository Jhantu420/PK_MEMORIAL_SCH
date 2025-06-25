import express from 'express';
import { adminLogin, adminRegister, getAdmin, logout } from '../controllers/adminController.js';
import { verifyUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/registerAdmin',adminRegister);
router.post('/loginAdmin',adminLogin);
router.get('/getAdmin',verifyUser,getAdmin);
router.get('/logout',logout);

export default router;