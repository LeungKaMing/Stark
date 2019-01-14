/**
 * 用户业务操作
 * 逻辑层主要对从控制层传入的类似FormData的大型数据进行筛选，把精简后的数据传去模型层做处理。
 */
const models = require('../models/index')

const resultObj = {
    getDraftList: async (params) => {
        const modelResult = await models[params.url](params.data)
        return {
            code: 200,
            msg: `${params.msg}成功！`,
            data: modelResult.data
        }
    },
    saveActivity: async (params) => {
        const modelResult = await models[params.url](params.data)
        return {
            code: 200,
            msg: `${params.msg}成功！`,
            data: modelResult.data
        }
    },
    publishActivity: async (params) => {
        const modelResult = await models[params.url](params.data)
        return {
            code: 200,
            msg: `${params.msg}成功！`,
            data: modelResult.data
        }
    },
}
module.exports = resultObj