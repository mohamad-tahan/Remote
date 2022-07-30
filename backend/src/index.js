const { Router } = require('express');
const {register,login,getUser,updateUser, removeUser } = require('./user/controller/user');
const{addFiles,getFilesbyId,updateFile, removeFile,getFilesbyUserId, updateFileName} = require('./file/controller/file');
const{addLanguages,getLanguages} = require('./language/controller/language')
const{addContactUs,getContactUs} = require('./contactUs/controller/contact')
const router = Router();
const userMiddleware = require('../middleware/userMiddleware')
const Agora = require("agora-access-token");

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/getUser', userMiddleware(), (req, res) => getUser(req, res));

router.post('/auth/addFiles', userMiddleware(), addFiles);

router.post('/auth/addLanguages',userMiddleware(), addLanguages);
router.get('/auth/getLanguages', userMiddleware(),getLanguages );

router.get('/auth/getFilesbyId', userMiddleware(), getFilesbyId);
router.get('/auth/getFilesbyUserId', userMiddleware(), getFilesbyUserId);

router.put('/auth/updateFile', userMiddleware(), updateFile);
router.delete('/auth/removeFile',userMiddleware(),  removeFile);
router.put('/auth/updateFileName', userMiddleware(), updateFileName);


router.put('/auth/updateUser', userMiddleware(), updateUser);
router.delete('/auth/removeUser', userMiddleware(), removeUser);

router.post('/auth/addContactUs', addContactUs);
router.get('/auth/getContactUs', getContactUs);




router.post("/rtctoken", (req, res) => {
    const appID = "51f779f5682141f7b835504c65cd312a";
    const appCertificate = "97d424c16b154c65b1b457ae0eb79730";
    const expirationTimeInSeconds = 9999999;
    const uid = Math.floor(Math.random() * 100000);
    const role = req.body.isPublisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
    const channel = req.body.channel;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
  
    const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, expirationTimestamp);
    res.send({ uid, token });
  });


module.exports = router;
