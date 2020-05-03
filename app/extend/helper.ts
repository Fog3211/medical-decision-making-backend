// 处理成功响应
export function success(params: anyObj): any {
  const { ctx, result = [], msg = '操作成功' } = params

  ctx.body = {
    code: 200,
    result,
    msg,
  }
  ctx.status = 200
}

// 处理一般错误，如用户名重复
export function warning(params: anyObj): any {
  const { ctx, result = null, msg = '请求有误' } = params

  ctx.body = {
    code: 101,
    result,
    msg,
  }
  ctx.status = 200
}

// 处理严重错误
export function error(params: anyObj): any {
  const { ctx, result = null, msg = '请求失败' } = params

  ctx.body = {
    code: 102,
    result,
    msg
  }
  ctx.status = 200
}