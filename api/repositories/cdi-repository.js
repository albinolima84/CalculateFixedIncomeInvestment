const config = require('config');
const { MongoClient } = require("mongodb");
const uri = config.connectionString;
const client = new MongoClient(uri, {useUnifiedTopology: true});

exports.getRates = async (investmentDate, currentDate) => {
    let cdi = [];
    let query = {
            rateDate: {
                        $gte: investmentDate,
                        $lt: currentDate
            }
    };

    let options = {
        sort: { rateDate: 1 },
        projection: { _id: 0, rateDate: 1, rateValue: 1 },
    };

    await client.connect();
    const database = client.db(config.database);
    const collection = database.collection(config.collection);

    let cursor = collection.find(query, options);//.sort({ 'rateDate': 1 });
    cdi = await cursor.toArray();
    await client.close();

    return cdi;    
};

exports.getAll = async () => {
    let cdi = [];
    await client.connect();
    const database = client.db(config.database);
    const collection = database.collection(config.collection);

    let options = {
        sort: { rateDate: 1 },
        projection: { _id: 0, rateDate: 1, rateValue: 1 },
    };

    let query = {};

    let cursor = collection.find(query, options).sort({ 'rateDate': 1 });
    cdi = await cursor.toArray();
    
    await client.close();

    return cdi;
};

exports.clear = async() => {
    
    await client.connect();
    const database = client.db(config.database);
    const collection = database.collection(config.collection);

    await collection.deleteMany({});
};

exports.import = async (docs) => {
    await client.connect();
    const database = client.db(config.database);
    const collection = database.collection(config.collection);
    
    const options = { ordered: true };
    const result = await collection.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
};