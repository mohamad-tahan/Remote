const { Router } = require('express');
const {register,login,getUser,updateUser, removeUser } = require('./user/controller/user');
const{addFiles,getFilesbyId,updateFile, removeFile,getFilesbyUserId} = require('./file/controller/file');
const{addLanguages,getLanguages} = require('./language/controller/language')
const router = Router();
const userMiddleware = require('../middleware/userMiddleware')

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/getUser', userMiddleware(), (req, res) => getUser(req, res));

router.post('/auth/addFiles', addFiles);

router.post('/auth/addLanguages', addLanguages);
router.get('/auth/getLanguages',getLanguages );

router.get('/auth/getFilesbyId', getFilesbyId);
router.get('/auth/getFilesbyUserId', getFilesbyUserId);

router.put('/auth/updateFile', userMiddleware(), updateFile);
router.delete('/auth/removeFile',userMiddleware(),  removeFile);

router.put('/auth/updateUser', userMiddleware(), updateUser);

router.delete('/auth/removeUser', userMiddleware(), removeUser);



module.exports = router;
