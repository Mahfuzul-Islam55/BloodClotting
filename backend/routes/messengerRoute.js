const { getFriends,messageUploadDB,messageGet,imageSend } = require('../controllers/messengerController');
const {authMiddleware}=require('../middleware/authMiddleware');
const router=require('express').Router();

router.get('/get-friends',authMiddleware,getFriends);
router.post('/send-message',authMiddleware,messageUploadDB);
router.get('/get-message/:id',authMiddleware,messageGet);
router.post('/image-message-send',authMiddleware,imageSend);

module.exports=router;