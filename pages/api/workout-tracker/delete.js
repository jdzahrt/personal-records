import {getMongoClient} from '../../../db/mongo';
import mongodb from 'mongodb';

export default async (req, res) => {
    const workoutId = req.query.id
    const client = await getMongoClient()
    const db = client.db('personal-records')
    const collectionName = 'workout';

    try {
        const deleteRecord = async () => {
            const workoutCollection = db.collection(collectionName);

            const newId = new mongodb.ObjectId(workoutId);

            const result = await workoutCollection.deleteOne({_id: newId});

            console.log(
                `${result.deletedCount} documents were deleted with the _id: ${workoutId}`,
            );
        }

        await deleteRecord().catch(console.dir);

        res.status(200).json({status: 'Delete Success'})
    } catch (error) {
        console.log('error', error);
    } finally {
        client.close()
    }
}
