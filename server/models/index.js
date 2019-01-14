// 模型层需要处理跟数据库交互的SQL语句
// 所有sql语句都要封装起来
const dbUtils = require('../database/index.js')
const resultObj = {
    getDraftList: async (params) => {
        return await dbUtils.insertData(params, 'activity')
    },
    saveActivity: async (params) => {
        return await dbUtils.insertData(params, 'activity')
    },
    publishActivity: async (params) => {
        return await dbUtils.insertData(params, 'activity')
    },
}

module.exports = resultObj