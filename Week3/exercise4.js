const { MongoClient } = require("mongodb");
const csv=require('csvtojson');

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>.mongodb.net/world?retryWrites=true&w=majority";
const client = new MongoClient(url);
 

 const dbName = "world";

const run = async () => {
    try {
        
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        const importCollection = async(collectionName) => {
            try {
                await db?.collection(collectionName)?.drop();
            } catch (error) {
                console.log(error.message);
            }
        
            const col = db.collection(collectionName);
            const csvFilePath = `./world/${collectionName}.csv`;
            
            const jsonArray = await transferCSVToJson(csvFilePath);
            
            await col.insertMany(jsonArray);
         
        }

        await Promise.all([importCollection('city'), importCollection('country'), importCollection('countrylanguage')]);

        /* 1- Create a new record (document) for a new city (your home town, say) */
        const col = db.collection('city');
        const newCity = await col.insertOne({ Name: "Sneek", CountryCode: "NLD", District: "Friesland", Population: 33000 });
        console.log('---------------- NEW CITY -------------------', newCity)
       
        /* 2- Update that record with a new population */
        const updatedCity = await col.findOneAndUpdate(
            { _id:  newCity.insertedId},
            { $set: { Population: 34000 } },
            { returnOriginal: false,   returnDocument : "after" }
        );
        console.log('---------------- CITY AFTER POPULATION UPDATE -------------------', updatedCity)

        /* 3- Read the document that you just updated in two ways : finding by the city name, and then by the country code */
        const findCityByName = await col.findOne({ Name: "Sneek" });
        console.log('---------------- FIND CITY BY NAME -------------------', findCityByName);
        
        console.log('---------------- CITIES BY COUNTRY CODE -------------------');
        await col.find({ CountryCode: "NLD" }).forEach(console.log);
        
        /* 4- Delete the city */
        const deletedCity = await col.findOneAndDelete({_id:  newCity.insertedId});
        console.log('---------------- DELETED CITY -------------------', updatedCity)
       

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
        console.log("Completed! connection closed.");
    }
    
}          
 

 
    
    

 const transferCSVToJson = async (csvFilePath) => {
    const jsonArray = await csv().fromFile(csvFilePath);
    return jsonArray;
}


run();