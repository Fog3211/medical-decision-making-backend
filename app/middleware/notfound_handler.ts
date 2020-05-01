export default () => {
    return async function notFoundHandler(ctx, next) {
        await next();
        if (ctx.status === 404 && !ctx.body) {
            ctx.throw(404, '访问路径不存在！')
        }
    };
};
