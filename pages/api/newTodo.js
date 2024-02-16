import { MongoClient } from "mongodb";

const handler = async(req, res) => {
    if(req.method !== 'POST'){
        return res.status(405).end();// 405 error means suppose the server has received a request method that is not supported for the target resource. mtlb ye function sirf post ke liye h put patch ke liye ni
    }
    const data = req.body;
    console.log(data);

    const client = await MongoClient.connect('mongodb+srv://harshpk:Asdf-1234@cluster0.815angp.mongodb.net/todo?retryWrites=true&w=majority')//here we connected mongodb by giving collection name todo

    const db = client.db();

    const todoCollection = db.collection('todo');

    const result = await todoCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({message: 'successfully inserted todo'});
}

export default handler;