import { Service } from 'egg'
import { UserType } from '../config/type.config'
import { encryptionUtils } from '../utils/index'

export default class UserService extends Service {

    // 获取所有用户列表(分页+模糊搜索)
    public async index(payload) {
        const { pageNo, pageSize, name } = payload
        const skip = (pageNo - 1) * pageSize
        const params = {
            $and: [
                { name: { $regex: name || '' } }
            ]
        }
        const result = await this.ctx.model.User.find(params).populate('User').skip(skip).limit(pageSize).sort({ createdAt: -1 }).exec()
        const count = await this.ctx.model.User.find(params).countDocuments()

        const data = result.map(u => {
            return {
                id: u.id,
                name: u.name,
                nickName: u.nickName,
                sex: u.sex ? '男' : '女',
                age: u.age,
                telphone: u.telphone,
                isForbidden: u.isForbidden,
                createdAt: u.createdAt,
            }
        })

        return { count, data }
    }

    // 封禁用户 
    async destroyUser(id: string) {
        const { ctx } = this
        try {
            const user = await ctx.model.User.findById(id)
            if (!user) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.User.findByIdAndUpdate(id, { isForbidden: true })
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更新用户信息
    public async update(id: string, payload: UserType) {
        const { ctx } = this
        try {
            const user = await ctx.model.User.findById(id)
            if (!user) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.User.findByIdAndUpdate(id, payload)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 获取单个用户信息
    async showUserDetail(id: string) {
        const { ctx } = this
        const user = await ctx.model.User.findById(id)

        if (user) {
            return {
                id: user.id,
                name: user.name,
                nickName: user.nickName,
                adress: user.adress,
                createdAt: user.createdAt,
                sex: user.sex,
                telphone: user.telphone,
            }
        } else {
            ctx.throw(101, '未找到用户')
        }
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