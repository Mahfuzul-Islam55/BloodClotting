const router=require('express').Router();
const {userRegister,userLogin,userLogout}=require('../controllers/authController');
const {authMiddleware}=require('../middleware/authMiddleware');

router.post('/user-register',userRegister);
router.post('/user-login',userLogin);
router.post('/user-logout',authMiddleware,userLogout);;
module.exports=router;