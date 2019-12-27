import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo): any => {
  const config = {} as PowerPartial<EggAppConfig>

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513779989145_1674'

  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler', 'gzipResponse']

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  }

  // gzip下限，小于1k不压缩
  config.gzip = {
    threshold: 1024
  }

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:8000'],
  }

  config.multipart = {
    fileExtensions: ['.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov'], // 增加对 .apk 扩展名的支持
  },

    config.bcrypt = {
      saltRounds: 10 // default 10
    }

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_dev',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
  }

  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt', // optional
  }

  config.cors = {
    origin: '*',// 匹配规则  域名+端口  *则为全匹配
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  return config
}

