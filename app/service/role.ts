import { Service } from 'egg'

export default class RoleService extends Service {
    // create======================================================================================================>
    public async create(payload) {
        const { ctx } = this
        return ctx.model.Role.create(payload)
    }

    // destroy======================================================================================================>  
    async destroy(_id: string) {
        const { ctx } = this
        const role = await ctx.service.role.find(_id)
        if (!role) {
            ctx.throw(404, 'role not found')
        }
        return ctx.model.Role.findByIdAndRemove(_id)
    }

    // update======================================================================================================>
    public async update(_id: string, payload) {
        const { ctx } = this
        const role = await ctx.service.role.find(_id)
        if (!role) {
            ctx.throw(404, 'role not found')
        }
        return ctx.model.Role.findByIdAndUpdate(_id, payload)
    }

    // show======================================================================================================>
    async show(_id) {
        const role = await this.ctx.service.role.find(_id)
        if (!role) {
            this.ctx.throw(404, 'role not found')
        }
        return this.ctx.model.Role.findById(_id)
    }

    // removes======================================================================================================>
    async removes(values) {
        return this.ctx.model.Role.remove({ _id: { $in: values } })
    }

    // Commons======================================================================================================>
    async find(id) {
        return this.ctx.model.Role.findById(id)
    }

}