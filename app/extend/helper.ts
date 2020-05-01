// 处理成功响应
export function success({
  ctx,
  data = null,
  msg = '操作成功'
}): any {
  ctx.body = {
    code: 200,
    data,
    msg
  }
  ctx.status = 200
}

// 处理一般错误，如用户名重复
export function warning({
  ctx,
  data = null,
  msg = '请求有误'
}): any {
  ctx.body = {
    code: 101,
    data,
    msg
  }
  ctx.status = 200
}

// 处理严重错误
export function error({
  ctx,
  data = null,
  msg = '请求失败'
}): any {
  ctx.body = {
    code: 102,
    data,
    msg
  }
  ctx.status = 200
}