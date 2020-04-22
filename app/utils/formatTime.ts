import * as dayjs from 'dayjs'
// 格式化时间
export default (time: any) => {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}