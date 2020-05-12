import * as dayjs from 'dayjs'

export default {
    nowTime: () => dayjs().format('YYYY-MM-DD HH:mm:ss'),
    nowDate: () => dayjs().format('YYYY-MM-DD'),
    unix: (t = null) => t ? dayjs().unix() : dayjs(t).unix(),
}
