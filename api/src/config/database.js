const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://tobias:${process.env.DATABASE_PASSWORD}@cluster0.d4ry0.mongodb.net/vuejs-challenge?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})