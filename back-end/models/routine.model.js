const mongoose = require('mongoose')
const Schema = mongoose.Schema

const routineSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        }
    }
)

module.exports.schema = routineSchema

module.exports.model = mongoose.model('Routine', routineSchema)
