const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const request = require('request');
const User = require('../models/User');
require('express-async-errors');

let loginFailMsg = {code : 0 , msg : '登陆失败'};
router.post('/onlogin' , (req , res) =>{
    if(req.body.code){
        request.post({
            url : 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code' ,
            form : {
                        appid : 'wx2b5df0ce437ce370',
                        secret : '88d3e0e6fd607e1035d91699728d940a',
                        js_code : req.body.code,
                        grant_type : 'authorization_code'
                    }
            },
            async (err, httpResponse , body) => {
                if(err){
                    res.json(loginFailMsg);
                    throw err;
                }else{
                    let resBody = JSON.parse(body);
                    let rsUser = await User.findOne({opend_id: resBody.opend_id});
                    if(!rsUser){
                        let newUser = new User({
                            open_id: resBody.openid,
                            session_key: resBody.session_key,
                            createMeeting : [],
                            joinMeeting : [],
                            isOnline:  true
                        });
                        newUser.save(async (err ,rs) => {
                            if(err){
                                res.json(loginFailMsg);
                                throw err;
                            }else{
                                let finUserID =await User.findOne({opend_id: rs.opend_id} , {_id : 1});
                                res.json({code : 1 , msg : '登陆成功' , data : {userId : finUserID}});
                            }
                        });
                    }else{
                        rsUser.sOnline = true;
                        rsUser.save(function(err , rs){
                            if(err){
                                res.json(loginFailMsg);
                                throw err;
                            }else{
                                res.json({code : 1 , msg : '登陆成功' , data : {userId : rs._id}});
                            }
                        });

                    }
                }
            });
        }
    });
module.exports = router;
