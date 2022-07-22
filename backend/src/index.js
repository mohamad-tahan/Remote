const { Router } = require('express');
const {register,login,getUser,updateUser, removeUser } = require('./user/controller/user');
const{addFiles,getFilesbyId,updateFile, removeFile,getFilesbyUserId, updateFileName} = require('./file/controller/file');
const{addLanguages,getLanguages} = require('./language/controller/language')
const router = Router();
const userMiddleware = require('../middleware/userMiddleware')

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/getUser', userMiddleware(), (req, res) => getUser(req, res));

router.post('/auth/addFiles', userMiddleware(), addFiles);

router.post('/auth/addLanguages', addLanguages);
router.get('/auth/getLanguages', userMiddleware(),getLanguages );

router.get('/auth/getFilesbyId', userMiddleware(), getFilesbyId);
router.get('/auth/getFilesbyUserId', userMiddleware(), getFilesbyUserId);

router.put('/auth/updateFile', userMiddleware(), updateFile);
router.delete('/auth/removeFile',userMiddleware(),  removeFile);
router.put('/auth/updateFileName', userMiddleware(), updateFileName);


router.put('/auth/updateUser', userMiddleware(), updateUser);

router.delete('/auth/removeUser', userMiddleware(), removeUser);



module.exports = router;
