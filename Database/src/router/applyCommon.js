const express = require('express')
const mongo = require('../db/mongo')
const router = express.Router()
const { formatData, encrypto } = require('../utils')

const LiuApply = 'LiuApply'
const LinApply = 'LinApply'
const colNamePsw = 'password'

// 设置中间件 获取post请求传递过来的参数
router.use(express.json());
router.use(express.urlencoded({extended:true}));


// 新建申请数据写进mongoDB  /applyCommon/create
router.get('/create', async(req, res) => {
  const { id, message, pay, money, necessary, startTime, endTime, time,status } = req.query
  let applyID = ''
  try {
    await mongo.create(LiuApply, { id, message, pay, money, necessary, startTime, endTime, time, applyID, status })
    await mongo.create(LinApply, { id, message, pay, money, necessary, startTime, endTime, time, applyID, status })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

// /applyCommon/list
// 所有申请分页信息
router.post('/list', async(req, res) => {
  let { page = 1, size = 50, sort = 'regtime', total, applyID } = req.body
  let colName = null
  if(applyID==='1'){
    colName=LinApply
  }else{
    colName=LiuApply
  }

  const skip = (page - 1) * size
  const limit = size * 1
  total = !((total == '0' || total == 'false'))
  const result = await mongo.find(colName, {applyID}, { skip, limit, sort, total })
  res.send(formatData({ data: total ? result : result.result }))
})

// /applyCommon/list
// 关于我的分页信息
router.post('/minelist', async(req, res) => {
  let { page = 1, size = 50, sort = 'regtime', total, id } = req.body
  let colName = null
  if(id==='1'){
    colName=LiuApply
  }else{
    colName=LinApply
  }
  const skip = (page - 1) * size
  const limit = size * 1
  total = !((total == '0' || total == 'false'))
  const result = await mongo.find(colName, {id}, { skip, limit, sort, total })
  res.send(formatData({ data: total ? result : result.result }))
})

// /applyCommon/update
// 把编辑好的数据更新到mongoDB
router.post('/update', async(req, res) => {
  const { _id, id, status } = req.body
  let colName = null
  if(id==='1'){
    colName=LinApply
  }else{
    colName=LiuApply
  }
  try {
    await mongo.update(colName, { '_id': _id }, { 'status':status })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

// api/houselist/temporary
// 新建临时看房的密码数据写进mongoDB
router.get('/temporary', async(req, res) => {
  const { doorPsw, doorPswTime, houseId, housePsw, housePswTime, status } = req.query
  try {
    await mongo.create(colNamePsw, { doorPsw, doorPswTime, houseId, housePsw, housePswTime, status })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

// api/houselist/temporaryList
// 所有临时密码列表分页信息
router.get('/temporaryList', async(req, res) => {
  let { page = 1, size = 50, sort = 'regtime', total } = req.query
  const skip = (page - 1) * size
  const limit = size * 1
  total = !((total == '0' || total == 'false'))
  const result = await mongo.find(colNamePsw, {}, { skip, limit, sort, total })
  res.send(formatData({ data: total ? result : result.result }))
})

// api/houselist/tempupdate
// 修改临时密码状态
router.get('/tempupdate', async(req, res) => {
  const { _id, status, doorPsw, housePsw } = req.query
  try {
    await mongo.updatetemp(colNamePsw, { '_id': _id }, { _id, status, doorPsw, housePsw })
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: 400 }))
  }
})

module.exports = router
