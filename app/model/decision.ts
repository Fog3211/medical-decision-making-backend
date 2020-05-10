import { Application } from 'egg'
import { formatTime } from '../utils/index'

export default (app: Application) => {
    const mongoose = app.mongoose

    const DecisionSchema = new mongoose.Schema({
        name: { type: String, required: true },
        handler: { type: String, required: true, default: 1 },
        status: { type: Number, required: true },
        question: { type: String, required: true },
        answer: { type: String, required: true },
        createdAt: { type: String, default: formatTime.nowTime() },
        updatedAt: { type: String, required: true, default: formatTime.nowTime() },
    })

    return mongoose.model('Decision', DecisionSchema)
}