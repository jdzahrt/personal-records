import {getMongoClient} from '../../../db/mongo';
import mongodb from 'mongodb';

export default async (req, res) => {
    const alcoholId = req.query.id
    const client = await getMongoClient()
    const db = client.db('personal-records')
    const collectionName = 'alcohol';
    let updatedRecord;

    try {
        const updateRecord = async () => {
            const alcoholCollection = db.collection(collectionName);

            const newId = new mongodb.ObjectId(alcoholId);

            const updateRecord = {
                $set: {
                    active: req.body.active,
                    endDate: req.body.endDate
                }
            };
            console.log(updateRecord)

            const result = await alcoholCollection.findOneAndUpdate({_id: newId},
                updateRecord,
                {returnOriginal: false});

            updatedRecord = result.value

            console.log(
                `${result.ok} documents were updated with the _id: ${alcoholId}`,
            );
        }

        await updateRecord().catch(console.dir);

        res.status(200).json(updatedRecord)
    } catch (error) {
        console.log('error', error);
    } finally {
        await client.close()
    }
}
