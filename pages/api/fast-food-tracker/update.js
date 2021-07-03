import {getMongoClient} from '../../../db/mongo';
import mongodb from 'mongodb';

export default async (req, res) => {
    const alcoholId = req.query.id
    const client = await getMongoClient()
    const db = client.db('personal-records')
    const collectionName = 'fastfood';

    try {
        const updateRecord = async () => {
            const fastFoodCollection = db.collection(collectionName);

            const newId = new mongodb.ObjectId(alcoholId);

            const updateRecord = {
                $set: {
                    active: false,
                    endDate: new Date().toString()
                }
            };

            const result = await fastFoodCollection.updateOne({_id: newId}, updateRecord);

            console.log(
                `${result.matchedCount} documents were updated with the _id: ${alcoholId}`,
            );
        }

        updateRecord().catch(console.dir);

        res.status(200).json({status: 'Update Success'})
    } catch (error) {
        console.log('error', error);
    } finally {
       await client.close()
    }
}
