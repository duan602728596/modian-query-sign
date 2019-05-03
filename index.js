const MD5 = require('md5.js');
const stringify = require('qs/lib/stringify');
const transform = require('lodash/transform');
const sortBy = require('lodash/sortBy');

/**
 * 把对象转换成数组
 * @param { object } obj
 * @return { Array<{ key: string, value: any }> }
 */
function obj2Arr(obj) {
  return transform(obj, function(result, value, key) {
    result.push({ key, value });
  }, []);
}

/**
 * 数组转换成对象
 * @param { Array<{ key: string, value: any }> } arr
 * @return { object }
 */
function arr2Obj(arr) {
  return transform(arr, function(result, item, index) {
    result[item.key] = item.value;
  }, {});
}

/**
 * 摩点请求参数计算
 * @param { object } query: 请求参数
 * @return { string }
 */
function modianQuerySign(query) {
  const arr = sortBy(obj2Arr(query), ['key']); // 排序

  const signStr = new MD5().update(stringify({
    ...arr2Obj(arr),
    p: 'das41aq6'
  })).digest('hex'); // 加密计算

  return signStr.substr(5, 16);
}

module.exports = modianQuerySign;