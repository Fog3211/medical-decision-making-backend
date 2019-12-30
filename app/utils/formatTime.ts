import * as moment from 'moment'
// 格式化时间
export function formatTime(time: any): any {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
}