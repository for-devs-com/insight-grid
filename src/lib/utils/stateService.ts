'use server';
import clientPromise from "@/lib/mongodb";

async function saveAppState(userId: string, canvasState: any) {
    const client = await clientPromise;
    const db = client.db('dataanalitycs_app');
    const collection = db.collection('user_states');

    return await collection.updateOne(
        {userId: userId},
        {$set: {canvasState: canvasState, lastUpdated: new Date()}},
        {upsert: true}
    );
}



async function getAppState(userId: string) {
    const client = clientPromise;
    const db = client.db('dataanalitycs_app');
    const collection = db.collection('user_states');

    const userState = await collection.findOne({ userId: userId });
    return userState?.canvasState ;
}

const verifyUserExistsInDb = async (userId: string) => {
    if (!userId) throw new Error('userId is required');

    const client = await clientPromise;  // Tu conexión a Mongo
    const db = client.db('dataanalitycs_app');
    console.log('db', db);
    const collection = db.collection('user_states');
    console.log('collection', collection);
    const user = await collection.findOne({ userId });

    return !!user;  // Devuelve true si el usuario existe, false si no.
};

export { saveAppState, getAppState, verifyUserExistsInDb };

