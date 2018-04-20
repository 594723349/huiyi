const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');
const User = require('../models/User');
require('express-async-errors');
router.post('/createMeeting' , function(req, res){
    let data = req.body;
    let createMeetUrl = './huiyiData/huiyiData?meetId=';
    console.log(data.createUserId)
    if(req){
        new Meeting({
            createUserId : data.createUserId,
            title : data.title,
            startDate : data.startDate,
            endDate : data.endDate,
            address : data.address,
            introduction : data.introduction,
            limitNumber : data.limitNumber
        }).save(async function(err , result){
            if(err){
                res.json({code : 0, msg : '创建失败'});
            }else{
                let meetId = result._id;
                let createMeetingList =await User.findOne({_id : data.createUserId} , {createMeeting : 1});
                let meetlistIndex = createMeetingList.createMeeting.length;
                createMeetUrl = createMeetUrl+meetId+"&list="+meetlistIndex;
                createMeetingList.createMeeting.push(createMeetUrl);
                createMeetingList.save(function(err, result){
                    if(err){
                        res.json({code : 0, msg : '创建失败'});
                    }else{
                        console.log(result);
                        res.json({code : 1, msg : '创建成功' , data: {meetUrl : createMeetUrl}});
                    }
                });
            }
        });
    }else{
        res.json({code : 0, msg : '信息不完整'});
    }
});

router.post('/myJoinMeeting' , async function(req, res){
   let data =  await Meeting.find();
   res.json(data);
});
router.post('/myCreateMeeting' ,async function(req, res){
    console.log(req.body);
    let myCreateMeeting = await Meeting.findOne({createUserId: req.body.userId},{title : 1, startDate: 1, address : 1});
    if(myCreateMeeting){
        res.json({code : 1, data : {title : myCreateMeeting.title , start : myCreateMeeting.startDate, address : myCreateMeeting.address}});
    }else{
        res.json({code :0, msg: '你尚未创建会议'});
    }
});
module.exports = router;