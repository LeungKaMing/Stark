/**
 * 用户业务操作
 * 逻辑层主要对从控制层传入的类似FormData的大型数据进行筛选，把精简后的数据传去模型层做处理。
 */
const models = require('../models/index')

module.exports = async (params) => {
    // 操作模型层
    console.log(params, '<<<<<<<<<<最后传给模型层的应该是纯粹的, 所有逻辑判断应该在逻辑层做掉')
    let resultObj = await models(params.data)
    if (resultObj) {
        params.code = 200
        params.msg = `${params.msg}成功！`
        params.data = resultObj.data
    }
    return params
}