import {getMongoClient} from '../../../db/mongo';
import {getSession} from 'next-auth/client'

export default async (req, res) => {
    // TODO: Handle users that are not signed in
    const session = await getSession({req})
    const user = session.user.email
    const {quitDate} = req.body

    const client = await getMongoClient()
    const db = client.db('personal-records')
    const collectionName = 'alcohol';

    try {
        const insertRecord = async () => {
            const alcoholCollection = db.collection(collectionName);

            const insertPayload = {
                email: user,
                quitDate,
                active: true
            };

            const result = await alcoholCollection.insertOne(insertPayload);

            console.log(
                `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
            );
        }

        await insertRecord().catch(console.dir);

        res.status(200).json({status: 'Success'})
    } catch (error) {
        console.log('error', error);
    } finally {
        client.close()
    }
}
