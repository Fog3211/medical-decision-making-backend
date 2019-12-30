import { Application } from 'egg'

export default (app: Application) => {
    const mongoose = app.mongoose

    const UserSchema = new mongoose.Schema({
        name: { type: String, required: true },
        age: { type: Number, required: true },
        adress: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    })

    return mongoose.model('User', UserSchema)
}