import {getMongoClient} from '../../../db/mongo';
import {getSession} from 'next-auth/client'

const collectionName = 'alcohol';

export default async (req, res) => {
    const session = await getSession({req})
    const userEmail = session.user.email

    const dbClient = await getMongoClient()

    const getHistory = async () => {
        const alcoholCollection = dbClient.collection(collectionName);

        const alcoholHistory = await alcoholCollection.find(
            {
                email: userEmail
            }
        ).toArray()

        return alcoholHistory
    }

    const results = await getHistory();
    console.log('results', results);

    res.status(200).json(results)
}
