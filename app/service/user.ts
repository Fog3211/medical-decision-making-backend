import { Service } from 'egg'
import { UserType } from '../config/type.config'
import { encryptionUtils } from '../utils/index'

export default class UserService extends Service {

    // 获取所有用户列表(分页+模糊搜索)
    public async index(payload) {
        const { pageNo = 1, pageSize = 20, name } = payload
        const skip = (pageNo - 1) * pageSize

        const result = await this.ctx.model.User.find({
            //多条件取交集
            $and: [
                { name: { $regex: name || '' } }
            ]
        }).populate('user').skip(skip).limit(pageSize).sort({ createdAt: -1 }).exec()
        console.log(payload, name)
        const count = result.length
        const data = result.map(u => {
            return {
                id: u._id,
                name: u.name,
                nickName: u.nickName,
                sex: u.sex,
            }
        })

        return { count, data }
    }

    // 删除用户 
    async destroy(id: string) {
        const { ctx } = this
        try {
            const user = await ctx.service.user.find(id)
            if (!user) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.User.findByIdAndRemove(id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更新用户信息
    public async update(id: string, payload: UserType) {
        const { ctx } = this
        try {
            const user = await ctx.service.user.find(id)
            if (!user) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.User.findByIdAndUpdate(id, payload)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 获取单个用户信息
    async show(id: string) {
        const { ctx } = this
        try {
            const user = await ctx.service.user.find(id)
            if (!user) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.User.findById(id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更加id查找数据
    async find(id: string) {
        return this.ctx.model.User.findById(id)
    }

    // 用户注册
    public async register(payload: UserType) {
        const { ctx } = this
        const params = {
            ...payload,
            password: encryptionUtils.encrypt(payload.password)
        }
        return ctx.model.User.create(params)
    }

    // 用户登录
    public async login(payload) {
        const { ctx } = this
        const params = {
            email: payload.email,
            telphone: payload.telphone,
            password: payload.password
        }
        Object.keys(params).forEach((key) => {
            if (params[key] === null || params[key] === undefined) {
                delete params[key]
            }
        })
        const currentUser = await ctx.model.User.findOne(params)

        if (currentUser) {
            return {
                id: currentUser.id,
                name: currentUser.name,
                auth: currentUser.auth,
                // token
            }
        } else {
            ctx.throw(101, '登录失败,密码或账号错误!')
        }
    }
}