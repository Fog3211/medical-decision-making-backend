import { Service } from 'egg'
import { AdminerType } from '../config/type.config'
import { encryptionUtils } from '../utils/index'

export default class AdminerService extends Service {

    // 获取所有管理员列表
    public async adminerList(payload) {
        const { ctx } = this
        const { pageNo, pageSize, name, createdAt, telphone, email } = payload
        const skip = ((Number(pageNo)) - 1) * Number(pageSize || 20)
        const params = {
            $and: [
                { name: { $regex: name || '' } },
                { email: { $regex: email || '' } },
                { createdAt: { $regex: createdAt || '' } }
            ],
            telphone: telphone || null
        }
        Object.keys(params).forEach((key) => {
            if (params[key] === null || params[key] === undefined) {
                delete params[key]
            }
        })

        const result = await ctx.model.Adminer.find(params).populate('Adminer').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        const count = await ctx.model.Adminer.find(params).countDocuments()
        const authList = await ctx.model.Auth.find({ isHidden: false }).populate('Auth').exec()

        const data = result.map(item => {
            const currentAuth = authList.find(u => item.auth == u._id)

            return {
                id: item.id,
                name: item.name,
                telphone: item.telphone,
                createdAt: item.createdAt,
                auth: currentAuth?.name,
            }
        })

        return { count, data }
    }

    // 添加单个用户
    public async createAdminer(payload: AdminerType) {
        const { ctx } = this
        const hasUser = await ctx.model.Adminer.findOne({ $or: [{ email: payload.email }, { telphone: payload.telphone }] })
        if (hasUser) {
            ctx.throw(103, '用户已存在')
        } else {
            return ctx.model.Adminer.create(payload)
        }
    }

    // 删除用户 
    async destroyAdminer(_id: string) {
        const { ctx } = this
        const currentUser = await ctx.model.Adminer.findOne({
            _id
        })
        if (currentUser) {
            return ctx.model.Adminer.findByIdAndRemove({ _id })
        } else {
            ctx.throw(101, '未找到用户')
        }
    }

    // 更新用户信息
    public async updateAdminer(_id: string, payload: AdminerType) {
        const { ctx } = this

        const Adminer = await ctx.model.Adminer.findOne({
            _id
        })
        if (!Adminer) {
            ctx.throw(101, '未找到用户')
        }
        return ctx.model.Adminer.findByIdAndUpdate(_id, {
            ...payload,
            password: encryptionUtils.decrypt(payload.password),
        })
    }

    // 获取单个用户信息
    public async adminerDetail(id: string) {
        const { ctx } = this

        const currentUser = await ctx.model.Adminer.findOne({
            _id: id
        })
        if (currentUser) {
            return {
                name: currentUser.name,
                password: encryptionUtils.encrypt(currentUser.password),
                auth: currentUser.auth,
                telphone: currentUser.telphone,
                email: currentUser.email,
            }
        } else {
            ctx.throw(101, '未找到用户')
        }
    }

    // 用户登录
    public async login(payload: AdminerType) {
        const { ctx } = this
        const params = {
            email: payload.email,
            telphone: isNaN(Number(payload.telphone)) ? null : Number(payload.telphone),
            password: encryptionUtils.decrypt(payload.password)
        }
        Object.keys(params).forEach((key) => {
            if (params[key] === null || params[key] === undefined) {
                delete params[key]
            }
        })
        const currentUser = await ctx.model.Adminer.findOne(params)
        if (currentUser) {
            return {
                id: currentUser.id,
                name: currentUser.name,
                auth: currentUser.auth,
                // token
            }
        } else {
            ctx.throw(102, '登录失败,密码或账号错误!')
        }
    }
}