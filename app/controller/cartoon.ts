import { Controller, Context } from 'egg'
import { DEFAULT_PAGENO, DEFAULT_PAGESIZE } from '../config/constant.config'

export default class CartoonController extends Controller {
    constructor(ctx: Context) {
        super(ctx)
    }

    // 获取所有用户列表
    public async cartoonList() {
        const { ctx, service } = this
        // 组装参数
        const payload = ctx.request.query || {}
        const params = {
            ...payload,
            pageNo: Number(payload.pageNo) || DEFAULT_PAGENO,
            pageSize: Number(payload.pageSize) || DEFAULT_PAGESIZE
        }
        const result = await service.cartoon.cartoonList(params)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, result })
    }
}