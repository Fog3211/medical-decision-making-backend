import { Context } from 'egg'

export default (): any => {
    return async (ctx: Context, next) => {
        // 拿到传会数据的header 中的token值
        const token = ctx.request.header.token

        // 当前token值不存在的时候
        if (!token) {
            ctx.body = {
                code: 401,
                msg: '尚未登录，请先登录!'
            }
        } else {
            next()
        }
    }
}
