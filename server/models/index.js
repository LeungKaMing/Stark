// 模型层需要处理跟数据库交互的SQL语句
// 所有sql语句都要封装起来
const dbUtils = require('../database/index.js')
module.exports = async (params) => {
    // 操作数据库
    let resultObj = await dbUtils.insertData(params.data, 'activity')
    return resultObj
}