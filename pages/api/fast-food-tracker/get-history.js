import {getMongoClient} from '../../../db/mongo';
import {getSession} from 'next-auth/react'

export default async (req, res) => {
    const session = await getSession({req})
    if (!session)
        return res.status(200).json([])

    const userEmail = session.user.email

    const client = await getMongoClient()
    const db = client.db('personal-records')
    const collectionName = 'fastfood';

    try {
        const getHistory = async () => {
            const fastFoodCollection = db.collection(collectionName);

            return fastFoodCollection.find({email: userEmail})
                .sort({active: -1}).toArray();
        }

        const results = await getHistory();

        res.status(200).json(results)
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}
