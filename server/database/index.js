const mongoose = require('mongoose')
// 引入库结构
const ActivityInfoSchema = require('./schema').activityInfoSchema
// 创建模型
const ActivityInfoModel = mongoose.model('User', ActivityInfoSchema)

const utils = {
    /**
     * 插入
     */
    insertData: (info, schema) => {
        let model
        return new Promise((resolve, reject) => {
            let temp = (obj) => {
                switch (schema) {
                    case 'user':
                        model = ActivityInfoModel
                        break
                }
                model(obj).save((err, res) => {
                    if (err) {
                        console.log(`插入数据错误:${err}`)
                        reject(err)
                    } else {
                        console.log(`插入数据成功:${res}`)
                        resolve(res)
                    }
                }) 
            }
            if (info instanceof Array) {
                // 数组
                for (let i = 0; i < info.length; i++) {
                    temp(info[i])
                }
            } else {
                temp (info)
            }
             
        })
    },

    /**
     * 查找
     */
    find: (info, schema) => {
        let model
        return new Promise((resolve, reject) => {
            switch (schema) {
                case 'user':
                    model = ActivityInfoModel
                    break
            }
            model.find(info, (err, res) => {
                if (err) {
                    console.log(`服务器出错:${err}`)
                    reject(err)
                } else {
                    if (!res.length) {
                        console.log('没有此数据')
                        resolve(res)
                    } else {
                        // console.log(`查询到啊:${res}`)
                        resolve(res)
                    }
                }
            })    
        })
    },

    /**
     * 删除
     *　　Model.findByIdAndRemove(id, [options], [callback])　　　　　　
    *　　Model.findOneAndRemove(conditions, [options], [callback])
    */
    del: (info, schema) => {
        let model
        return new Promise((resolve, reject) => {
            switch (schema) {
                case 'user':
                    model = ActivityInfoModel
                    break
            }
            model.remove(info, (err, res) => {
                if (err) {
                    console.log(`服务器出错${err}`)
                    reject(err)
                } else {
                    console.log(`已删除${res}`)
                    resolve(res)
                }
            })
        })
    },

    /**
     * 更新
     */
    update: (condition, updateOption, schema) => {
        let model
        return new Promise((resolve, reject) => {
            switch (schema) {
                case 'user':
                    model = ActivityInfoModel
                    break
            }
            model.update(condition, updateOption, (err, res) => {
                if (err) {
                    console.log(`服务器出错${err}`)
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    },

    findByIdAndUpdate: (id, updateInfo, schema) => {
        let model
        return new Promise((resolve, reject) => {
            switch (schema) {
                case 'user':
                    model = ActivityInfoModel
                    break
            }
            model.findByIdAndUpdate(id, updateInfo, (err, res) => {
                if (err) {
                    console.log('服务器出错')
                    reject(err)
                } else {
                    console.log(res)
                    resolve(res)
                }
            })
        })
    },

    findOneAndUpdate: (oldCondition, newCondition, schema) => {
        console.log(oldCondition, newCondition, 'in')
        let model
        return new Promise((resolve, reject) => {
            switch (schema) {
                case 'user':
                    model = ActivityInfoModel
                    break
            }
            model.findOneAndUpdate(JSON.parse(oldCondition), newCondition, (err, res) => {
                if (err) {
                    console.log('服务器出错')
                    reject(err)
                } else {
                    console.log(res, '更新成功')
                    resolve(res)
                }
            })
        })
    }
}
// utils.insertData({userName: 'ljm', password: '19920926ljm'}, 'user')
// find()
// find({'userage': {$gte: 21, $lte: 35}})
// del()
// update()
// findByIdAndUpdate('5a44cbad2b3a69783a0ccb83')
// findOneAndUpdate()
module.exports = utils