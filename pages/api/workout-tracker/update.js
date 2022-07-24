import {getMongoClient} from '../../../db/mongo';
import mongodb from 'mongodb';

export default async (req, res) => {
    const {_id, exercise, reps, date} = req.body
    const client = await getMongoClient()
    const db = client.db('personal-records')
    const collectionName = 'workout';

    try {
        const updateRecord = async () => {
            const workoutCollection = db.collection(collectionName);

            const newId = new mongodb.ObjectId(_id);

            const updateRecord = {
                $set: {
                    exercise,
                    reps,
                    date
                }
            };

            const result = await workoutCollection.updateOne({_id: newId}, updateRecord);

            console.log(
                `${result.matchedCount} documents were updated with the _id: ${_id}`,
            );
        }

        await updateRecord().catch(console.dir);

        res.status(200).json({status: 'Update Success'})
    } catch (error) {
        console.log('error', error);
    } finally {
       await client.close()
    }
}