import { Context } from 'egg'
import * as JWT from 'jsonwebtoken'
import { JWT_SECRET } from '../config/constant.config'
import { formatTime } from '../utils/index'

const context = {
    async validToken() {
        const ctx: Context = this
        const errorBase = {
            success: false,
            code: 401,
        }
        const token = ctx.request.header.authorization

        try {
            if (token) {
                const decode = (JWT.verify(token, JWT_SECRET) || {}) as anyObj
                const { id, exp } = decode

                if (!id) {
                    return {
                        ...errorBase,
                        msg: '没有权限！',
                    }
                }

                const user = await ctx.model.Adminer.findOne({
                    _id: decode.id,
                })

                if (!user || formatTime.unix() >= exp) {
                    return {
                        ...errorBase,
                        msg: '用户信息验证失败，请重新登录！',
                    }
                } else {
                    return {
                        code: 200,
                        success: true,
                        msg: '登录验证成功！',
                    }
                }
            } else {
                return {
                    ...errorBase,
                    msg: 'token不存在！',
                }
            }
        } catch (e) {
            return {
                ...errorBase,
                msg: '检测到token不合法！',
            }
        }
    },
}

export default context
