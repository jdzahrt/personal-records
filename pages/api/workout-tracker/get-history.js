import {getMongoClient} from '../../../db/mongo';
import {getSession} from 'next-auth/client'

export default async (req, res) => {
    const session = await getSession({req})
    if (!session)
        return res.status(200).json([])

    const userEmail = session.user.email
    
    const client = await getMongoClient()
    const db = client.db('personal-records')
    const collectionName = 'workout';

    try {
        const getHistory = async () => {
            const workoutCollection = db.collection(collectionName);

            return await workoutCollection.find({email: userEmail})
                .sort({active: -1}).toArray()
        }

        const results = await getHistory();

        res.status(200).json(results)
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}
