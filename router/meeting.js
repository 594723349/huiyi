const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');
const User = require('../models/User');
require('express-async-errors');
router.post('/createMeeting' , function(req, res){
    let data = req.body;
    let createMeetUrl = './huiyiData/huiyiData?meetId=';
    console.log(data.createUserId);
    if(req){
        new Meeting({
            createUserId : data.createUserId,
            title : data.title,
            startDate : data.startDate,
            endDate : data.endDate,
            address : data.address,
            introduction : data.introduction,
            limitNumber : data.limitNumber,
            count : {
                allpyNum : 50,
                signInNum : 30
            },
            setting: {
                meetingUrl : '1111',
                invitation : '1111',
                meetingChange : '1111'
            }
        }).save(async function(err , result){
            if(err){
                res.json({code : 0, msg : '创建失败'});
            }else{
                console.log(result);
                let meetId = result._id;
                let createMeetingList =await User.findOne({_id : data.createUserId} , {createMeeting : 1});
                console.log(createMeetingList)
                let meetingListIndex = createMeetingList.createMeeting.length;
                createMeetUrl = createMeetUrl+meetId+"&list="+meetingListIndex;
                result.setting.meetingUrl = createMeetUrl;
                result.save();
                createMeetingList.createMeeting.push(createMeetUrl);
                createMeetingList.save(function(err, result){
                    if(err){
                        res.json({code : 0, msg : '创建失败'});
                    }else{
                        console.log(result);
                        res.json({code : 1, msg : '创建成功' , data: {meetingUrl : createMeetUrl}});
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
    let myCreateMeeting = await Meeting.find({createUserId: req.body.createUserId},{_id : 1,title : 1, startDate: 1, address : 1});
    if(myCreateMeeting){
        res.json({code : 1, data : myCreateMeeting});
    }else{
        res.json({code :0, msg: '你尚未创建会议'});
    }
});
router.post('/meetingDetail' , async function(req, res){
    console.log(req.body);
    let meetingDetail =await Meeting.findOne({_id : req.body.meetingId} , {setting:1, count:1})
    if(meetingDetail){
        res.json({code : 1, data :meetingDetail})
    }else{
        res.json({code : 0, msg : '失败'})
    }

});
module.exports = router;