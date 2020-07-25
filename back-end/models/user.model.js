const mongoose = require('../common/services/mongoose.service').mongoose
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    age: String,
    skinType: String,
    usedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    routine: { type: Schema.Types.ObjectId, ref: 'Routine' },
    skinGoal: String,
})

userSchema.index(
    { email: 1 },
    { unique: true }
)

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true,
})

userSchema.findById = function (cb) {
    return this.model('Users').find({ id: this.id }, cb)
}

// adds a method to a user document object to create a hashed password
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password)
}

// adds a method to a user document object to check if provided password is correct
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}

userSchema.pre('save', function (next) {
    console.log('is modified' + this.isModified('password'))
    if (this.isModified('password')) {
        this.password = this.generateHash(this.password)
    }

    console.log(this.password);

    next()
})

const User = mongoose.model('Users', userSchema)

module.exports.model = User

module.exports.findByEmail = (email) => {
    return User.find({ email: email })
}
module.exports.findById = (id) => {
    return User.findById(id).then((result) => {
        result = result.toJSON()
        delete result._id
        delete result.__v
        return result
    })
}

module.exports.createUser = (userData) => {
    const user = new User(userData)
    return user.save()
}

module.exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err)
                } else {
                    resolve(users)
                }
            })
    })
}

module.exports.patchUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, user) {
            if (err) reject(err)
            for (let i in userData) {
                user[i] = userData[i]
            }
            user.save(function (err, updatedUser) {
                if (err) return reject(err)
                resolve(updatedUser)
            })
        })
    })
}

module.exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.remove({ _id: userId }, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(err)
            }
        })
    })
}
