import { Controller, Context } from 'egg'

export default class DepartmentController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }

    public async departmentList() {
        const { ctx, service } = this

        const result = await service.department.departmentList()

        ctx.helper.success({ ctx, result })
    }
}
