import { EggAppConfig, PowerPartial } from 'egg'

export default (): any => {
    const config = {} as PowerPartial<EggAppConfig>

    config.security = {
        csrf: {
            enable: false,
        },
        domainWhiteList: ['http://localhost:8000'],
    }

    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/egg_sit',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
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

