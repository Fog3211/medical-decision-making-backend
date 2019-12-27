const moment = require('moment')

// 格式化时间
exports.formatTime = (time: any) => moment(time).format('YYYY-MM-DD HH:mm:ss')

// 处理成功响应
export function success({
  ctx,
  res = null,
  msg = '请求成功'
}): any {
  ctx.body = {
    code: 0,
    data: res,
    msg
  }
  ctx.status = 200
}
