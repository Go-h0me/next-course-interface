
import { connectDatabase, insertDocument, getAllDocument } from '../../../helpers/db-util'

async function handler(req, res) {
    const eventId = req.query.eventId;

    let client

    try {
        client = await connectDatabase();

    } catch (error) {
        res.status(500).json({ message: "Connecting to the data failed!" })

        return
    }

    if (req.method === "POST") {
        const { email, name, text } = req.body
        if (!email.includes("@") ||
            !name ||
            name.trim() === "" ||
            !text ||
            text.trim() === ""
        ) {
            res.status(422).json({ message: "Invalid input." })

            client.close();

            return

        }
        const newComment = {
            // id: new Date().toISOString(),
            email,
            name,
            text,
            eventId
        };

        let result
        try {
            result = await insertDocument(client, 'comments', newComment)
            newComment._id = result.insertedId;

        } catch (error) {


            res.status(500).json({ message: "Inserting comment failed!" })

            return
        }

        // const db = client.db();
        // const result = await db.collection('comments').insertOne(newComment);
        // console.log(result);


        res.status(201).json({ message: "Added comment.", comment: newComment })
    }

    if (req.method === 'GET') {

        try {
            const documents = await getAllDocument(client, 'comments', { _id: -1 })
            res.status(200).json({ comments: documents })

        } catch (error) {
            res.status(500).json({ message: "Getting comments failed." })
            return
        }
        // const db = client.db();

        // const documents = await db.collection('comments').find().sort({ _id: -1 }).toArray();
    }

    client.close();

}

export default handler