import { Application } from 'egg'
import * as dayjs from 'dayjs'

export default (app: Application) => {
    const mongoose = app.mongoose

    const DepartmentSchema = new mongoose.Schema({
        name: { type: String, required: true },
        key: { type: String, required: true },
        child: { type: Array, required: true },
        createdAt: { type: String, default: dayjs().format('YYYY-MM-DD HH:mm:ss') },
    })

    return mongoose.model('Department', DepartmentSchema)
}