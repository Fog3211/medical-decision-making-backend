import * as zlib from 'zlib'// node自带模块
import { Context, EggAppConfig } from 'egg'
import isJSON from "../utils/isJson"

export default function (options: EggAppConfig['gzipResponse']): any {
    return async function (ctx: Context, next: () => Promise<any>) {
        await next()

        // 后续中间件执行完成后将响应体转换成 gzip
        let body = ctx.body
        if (!body) return
        // 支持 options.threshold
        if (options.threshold && ctx.length < options.threshold) return

        if (isJSON(body)) body = JSON.stringify(body)

        // 设置 gzip body，修正响应头
        const stream = zlib.createGzip()
        stream.end(body)
        ctx.body = stream
        ctx.set('Content-Encoding', 'gzip')
    }
}