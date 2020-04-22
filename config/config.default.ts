import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo): any => {
  const config = {} as PowerPartial<EggAppConfig>

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513779989145_1674'

  // 加载中间件
  config.middleware = ['errorHandler', 'gzipResponse']

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/'
  }
  // gzip下限，小于1k不压缩
  config.gzip = {
    threshold: 1024
  }

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:8000']
  }
  // 参数校验配置
  config.validate = {
    convert: true, //对入参进行转换
    widelyUndefined: true //空字符串,NaN,null转成 undefined
  }
  // 加密数据
  config.bcrypt = {
    saltRounds: 10
  }
  // 数据库配置
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_backend',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
  // token校验
  config.jwt = {
    secret: 'egg_backend',
    enable: true, // default is false
  }
  // 跨域处理
  config.cors = {
    origin: '*',// 匹配规则  域名+端口  *则为全匹配
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  return config
}

