import {getMongoClient} from '../../../db/mongo';
import {getSession} from 'next-auth/client'

const collectionName = 'alcohol';

export default async (req, res) => {
    const session = await getSession({req})
    const user = session.user.email
    const {quitDate} = req.body

    const dbClient = await getMongoClient()

    const insertRecord = async () => {
        const alcoholCollection = dbClient.collection(collectionName);

        const insertPayload = {
            email: user,
            quitDate
        };

        const result = await alcoholCollection.insertOne(insertPayload);

        console.log(
            `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
        );
    }

    insertRecord().catch(console.dir);

    res.status(200).json({status: 'Success'})
}
