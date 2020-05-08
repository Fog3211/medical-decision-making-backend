import { Application } from 'egg'
import { formatTime } from '../utils/index'

export default (app: Application) => {
    const mongoose = app.mongoose

    const DecisionSchema = new mongoose.Schema({
        name: { type: String, required: true },
        password: { type: String, required: true },
        nickName: { type: String, required: true },
        birthday: { type: String, required: true },
        sex: { type: Boolean, required: true },
        telphone: { type: Number, required: true },
        createdAt: { type: String, default: formatTime.nowTime() },
    })

    return mongoose.model('Decision', DecisionSchema)
}