import { Application } from 'egg'
import { formatTime } from '../utils/index'

export default (app: Application) => {
    const mongoose = app.mongoose

    const QuestionSchema = new mongoose.Schema({
        name: { type: String, required: true },
        key: { type: String, required: true },
        handler: { type: String, required: true, default: 'system init' },
        symptom: { type: String, required: true },
        bodyPart: { type: String, required: true },
        department: { type: String, required: true },
        tag: { type: Array, required: true },
        createdAt: { type: String, default: formatTime.nowTime() },
        isHidden: { type: Boolean, required: true }
    })

    return mongoose.model('Question', QuestionSchema)
}