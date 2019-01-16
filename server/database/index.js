const mongoose = require('mongoose')
// 引入库结构
const ActivityInfoSchema = require('./schema').activityInfoSchema
// 创建模型
const ActivityInfoModel = mongoose.model('Activity', ActivityInfoSchema)

function switchModel (schema) {
	let model
    switch (schema) {
			case 'activity':
				model = ActivityInfoModel
				break
		}
		return model
}

const utils = {
	/**
	 * 插入
	 */
	insertData: (info, schema) => {
		if (info) {
			return new Promise((resolve, reject) => {
				switchModel(schema)(info).save((err, res) => {
					if (err) {
						console.log(`插入数据错误:${err}`)
						reject('fail')
					} else {
						console.log(`插入数据成功:${res}`)
						resolve('done')
					}
				})
			})
		}
	},

	/**
	 * 查找
	 */
	find: (id, schema) => {
		return new Promise((resolve, reject) => {
			switchModel(schema).findById(id, (err, res) => {
				if (err) {
					console.log(`服务器出错:${err}`)
					reject('fail')
				} else {
					if (!res.length) {
						console.log('没有此数据')
						reject('fail')
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
	 *　Model.findByIdAndRemove(id, [options], [callback])　　　　　　
	 *　Model.findOneAndRemove(conditions, [options], [callback])
	 */
	del: (info, schema) => {
		return new Promise((resolve, reject) => {
			switchModel(schema).remove(info, (err, res) => {
				if (err) {
					console.log(`服务器出错${err}`)
					reject('fail')
				} else {
					console.log(`已删除${res}`)
					resolve('done')
				}
			})
		})
	},

	/**
	 * 更新
	 */
	update: (condition, updateOption, schema) => {
		return new Promise((resolve, reject) => {
			switchModel(schema).update(condition, updateOption, (err, res) => {
				if (err) {
					console.log(`服务器出错${err}`)
					reject('fail')
				} else {
					resolve('done')
				}
			})
		})
	},

	/**
	 * 更新
	 */
	findByIdAndUpdate: (id, updateInfo, schema) => {
		return new Promise((resolve, reject) => {
			switchModel(schema).findByIdAndUpdate(id, {dataSource: updateInfo}, (err, res) => {
				if (err) {
					console.log(`服务器出错${err}`)
					reject('fail')
				} else {
					resolve('done')
				}
			})
		})
	},

	/**
	 * 更新
	 */
	findOneAndUpdate: (oldCondition, newCondition, schema) => {
		return new Promise((resolve, reject) => {
			switchModel(schema).findOneAndUpdate(JSON.parse(oldCondition), newCondition, (err, res) => {
				if (err) {
					console.log('服务器出错')
					reject('fail')
				} else {
					console.log(res, '更新成功')
					resolve('done')
				}
			})
		})
	}
}

module.exports = utils
