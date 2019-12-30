// 处理成功响应
export function success({
  ctx,
  res = null,
  msg = '请求成功'
}): any {
  ctx.body = {
    code: 200,
    data: res,
    msg
  }
  ctx.status = 200
}

// 处理一般错误，如用户名重复
export function warning({
  ctx,
  res = null,
  msg = '请求有误'
}): any {
  ctx.body = {
    code: 101,
    data: res,
    msg
  }
  ctx.status = 200
}

// 处理严重错误
export function error({
  ctx,
  res = null,
  msg = '请求失败'
}): any {
  ctx.body = {
    code: 102,
    data: res,
    msg
  }
  ctx.status = 200
}