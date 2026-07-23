import mongoose from 'mongoose'

async function dbConnect() {
    try {
        await mongoose.connect(
            process.env.MONGO_URI,
            { dbName: process.env.MONGO_DB_NAME }
        )

        console.log('Database connected on: ', mongoose.connection.host);

    } catch (err) {
        console.error('Database Connection Error', err);
    }
}

export default dbConnect