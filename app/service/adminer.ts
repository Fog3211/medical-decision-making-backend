import { Service } from 'egg'
import { AdminerType } from '../config/type.config'
import { encryptionUtils } from '../utils/index'

export default class AdminerService extends Service {

    // 获取所有疾病列表(分页+模糊搜索)
    public async index(payload) {
        const { ctx } = this
        const { pageNo, pageSize, name } = payload
        const skip = ((Number(pageNo)) - 1) * Number(pageSize || 20)
        const params = {
            $and: [
                { name: { $regex: name || '' } }
            ]
        }
        const result = await ctx.model.Adminer.find(params).populate('Adminer').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        const count = await ctx.model.Adminer.find(params).countDocuments()

        const data = result.map(u => {
            return {
                id: u._id,
                name: u.name,
                auth: u.auth,
                createdAt: u.createdAt,
                telphone: u.telphone
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
    async destroyAdminer(id: string) {
        const { ctx } = this
        const currentUser = await ctx.model.Adminer.findOne({
            _id: id
        })
        if (currentUser) {
            return ctx.model.Adminer.findByIdAndRemove({ _id: id })
        } else {
            ctx.throw(101, '未找到用户')
        }
    }

    // 更新用户信息
    public async update(id: string, payload: AdminerType) {
        const { ctx } = this
        try {
            const Adminer = await ctx.service.Adminer.find(id)
            if (!Adminer) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Adminer.findByIdAndUpdate(id, payload)
        } catch{
            ctx.throw(101, '未找到用户')
        }
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
                password: currentUser.password,
                auth: currentUser.auth
            }
        } else {
            ctx.throw(101, '未找到用户')
        }
    }

    // 更加id查找数据
    public async find(id: string) {
        return this.ctx.model.Adminer.findById(id)
    }

    // 用户登录
    public async login(payload: AdminerType) {
        const { ctx } = this
        const params = {
            email: payload.email,
            telphone: payload.telphone,
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