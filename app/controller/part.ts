import { Controller, Context } from 'egg'

export default class PartController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }

    public async partList() {
        const { ctx, service } = this

        const result = await service.part.partList()

        ctx.helper.success({ ctx, result })
    }
}
