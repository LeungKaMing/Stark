const queryString = require('query-string')

export function getToken () {
}

/**
 * 将url的参数转换成对象格式
 * @returns {Object} 返回经过对象格式化的query
 */
export function getQueryString () {
   return queryString.parse(window.location.search)
}

/**
 * 检查字符参数是否在字符串里
 * @param {string} s 传入的字符参数
 * @param {string} str 完整字符串
 * @param {string} method 判断是检查开头 / 结尾 / 包含 关系
 * @param {string} pos 开始搜索的位置
 * @example statusAboutStr('startsWith', 's', 'string')
 * @example statusAboutStr('endsWith', 's', 'string')
 * @example statusAboutStr('includesWith', 's', 'string')
 */
export function statustAboutStr (method, s, str, pos = 0) {
    return s[method](str, pos)
}

/**
 * 对字符串进行补全
 * @description 从某个位置开始对某个字符串以某个字符进行补全，不足补到够为止
 * @description 如果省略最后一个参数，默认使用空格补全长度
 * @param {string} method 
 * @param {number} len 
 * @param {string} s 
 * @param {string} str 
 * @example padStr('padStart', 's', 'string', 4)
 * @example padStr('padEnd', 's', 'string', 4)
 * @example padStr('padStart', '09-01', 'YYYY-MM-DD', 10) => YYYY-09-01
 */
export function padStr (method, s, str, len = 2) {
    return s[method](len, str)
}

/**
 * 返回一个新字符串，表示将原字符串重复n次
 * @param {string} str 
 * @param {number} count 
 * @example repeat('ab', 4) => 'abababab'
 */
export function repeat (str, count = 0) {
    return str.repeat(count)
}

/**
 * 捕获命中正则具体位置的值
 * @description “具名组匹配”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（?<year>），然后就可以在exec方法返回结果的groups属性上引用该组名
 * @param {RegExp} reg 
 * @param {string} str 
 * @example captureGroup(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/, '1992-09-01') => {day: "01", month: "09", year: "1992"}
 */
export function captureGroup (reg, str) {
    return reg.exec(str).groups
}

/**
 * 将命中正则的字符串用模版格式进行替换
 * @param {RegExp} reg 
 * @param {string} str 
 * @param {string} template
 * @example changeTemplate(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u, '2019-01-22', '$<day>/$<month>/$<year>') 
 */
export function changeTemplate (reg, str, template) {
    return str.replace(reg, template)
}