const {MongoClient} = require('mongodb')
const fs = require('fs')
require('dotenv').config()


const {DATABASE_URL, DATABASE_NAME} = process.env
const client = new MongoClient(DATABASE_URL)

async function main() {
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(DATABASE_NAME)
    const collection = db.collection('users')

    const data = fs.readFileSync('mongo.users.json')
    const users = JSON.parse(data)

    await collection.insertMany(users.map(user => {
        const now = new Date()
        user.created_at = now
        user.updated_at = now
        return user
    }))

    return 'Users collection populated successfully.'
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close())