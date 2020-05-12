import { Context } from 'egg'

export default (): any => {
    return async (ctx: Context, next: Function) => {
        const res = await ctx.validToken()

        if (res.success) {
            await next()
        } else {
            ctx.throw(res.code, res.msg)
        }
    }
}
