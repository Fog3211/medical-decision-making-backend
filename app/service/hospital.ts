import { Service } from 'egg'
import { HospitalType } from '../config/type.config'

export default class HospitalService extends Service {

    // 获取所有疾病列表(分页+模糊搜索)
    public async hospitalList(payload) {
        const { pageNo, pageSize, name, province, city, phone } = payload
        const skip = (pageNo - 1) * pageSize
        const params = {
            $and: [
                { name: { $regex: name || '' } },
                { phone: { $regex: phone || '' } },
                { province: { $regex: province || '' } },
                { city: { $regex: city || '' } }
            ]
        }
        const result = await this.ctx.model.Hospital.find(params).populate('Hospital').skip(skip).limit(pageSize).sort({ createdAt: -1 }).exec()
        const count = await this.ctx.model.Hospital.find(params).countDocuments()

        return { count, data: result }
    }

    // 添加单个用户
    public async create(payload: HospitalType) {
        const { ctx } = this
        return ctx.model.Hospital.create(payload)
    }

    // 删除用户 
    async destroyHospital(id: string) {
        const { ctx } = this
        try {
            const Hospital = await ctx.model.Hospital.findById(id)
            if (!Hospital) {
                ctx.throw(101, '未找到相关医院')
            }
            return ctx.model.Hospital.findById(id)
        } catch{
            ctx.throw(101, '未找到相关医院')
        }
    }

    // 更新用户信息
    public async updateHospital(_id: string, payload: HospitalType) {
        const { ctx } = this

        const Hospital = await ctx.model.Hospital.findOne({ _id })
        if (!Hospital) {
            ctx.throw(101, '未找到对应的医院')
        }
        return ctx.model.Hospital.findByIdAndUpdate(_id, payload)
    }

    // 获取单个医院信息
    async hospitalDetail(id: string) {
        const { ctx } = this

        const Hospital = await ctx.model.Hospital.findById(id)
        if (!Hospital) {
            ctx.throw(101, '未找到相关医院')
        }
        return ctx.model.Hospital.findById(id)
    }

}