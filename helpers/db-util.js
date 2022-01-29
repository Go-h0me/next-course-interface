import { MongoClient } from 'mongodb'


export async function connectDatabase() {
    const client = await
     MongoClient.connect('mongodb+srv://Gohome:AEAr6lxbtDMsrQ1x@cluster0.n5txx.mongodb.net/events?retryWrites=true&w=majority'

    )
    return client
}

export async function insertDocument(client, collection, document) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result
}

export async function getAllDocument(client, collectio, sort) {
    const db = client.db();

    const documents = await db.collection(collection).find().sort(sort).toArray();
    return documents
}