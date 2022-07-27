import {getMongoClient} from '../../../db/mongo';
import mongodb from 'mongodb';

export default async (req, res) => {
    const fastFoodId = req.query.id
    const client = await getMongoClient()
    const db = client.db('personal-records')
    const collectionName = 'fastfood';

    try {
        const updateRecord = async () => {
            const fastFoodCollection = db.collection(collectionName);

            const newId = new mongodb.ObjectId(fastFoodId);

            const updateRecord = {
                $set: {
                    active: req.body.active,
                    endDate: req.body.endDate
                }
            };

            const result = await fastFoodCollection.findOneAndUpdate({_id: newId},
                updateRecord,
                {returnOriginal: false});

            console.log(
                `${result.ok} documents were updated with the _id: ${fastFoodId}`,
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
