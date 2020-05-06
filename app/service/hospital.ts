import { Service } from 'egg'
import { HospitalType } from '../config/type.config'

export default class HospitalService extends Service {

    // 获取所有疾病列表(分页+模糊搜索)
    public async hospitalList(payload) {
        const { pageNo, pageSize, name } = payload
        const skip = (pageNo - 1) * pageSize
        const params = {
            $and: [
                { name: { $regex: name || '' } }
            ]
        }
        const result = await this.ctx.model.Hospital.find(params).populate('Hospital').skip(skip).limit(pageSize).sort({ createdAt: -1 }).exec()
        const count = await this.ctx.model.Hospital.find(params).countDocuments()

        const data = result.map(u => {
            return {
                id: u.id,
                name: u.name,
                province: u.province,
                city: u.city,
                phone: u.phone,
                address: u.address,
                handler: u.handler,
                createAt: u.createAt
            }
        })

        return { count, data }
    }

    // 添加单个用户
    public async create(payload: HospitalType) {
        const { ctx } = this
        return ctx.model.Hospital.create(payload)
    }

    // 删除用户 
    async destroy(id: string) {
        const { ctx } = this
        try {
            const Hospital = await ctx.service.Hospital.find(id)
            if (!Hospital) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Hospital.findByIdAndRemove(id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更新用户信息
    public async update(id: string, payload: HospitalType) {
        const { ctx } = this
        try {
            const Hospital = await ctx.service.Hospital.find(id)
            if (!Hospital) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Hospital.findByIdAndUpdate(id, payload)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 获取单个用户信息
    async show(id: string) {
        const { ctx } = this
        try {
            const Hospital = await ctx.service.Hospital.find(id)
            if (!Hospital) {
                ctx.throw(101, '未找到用户')
            }
            return ctx.model.Hospital.findById(id)
        } catch{
            ctx.throw(101, '未找到用户')
        }
    }

    // 更加id查找数据
    async find(id: string) {
        return this.ctx.model.Hospital.findById(id)
    }

}