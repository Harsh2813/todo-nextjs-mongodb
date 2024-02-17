import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { id } = req.body; // Extract todo item ID from request body
    if (!id) {
      return res.status(400).json({ error: "Missing ID" });
    }

    const client = await MongoClient.connect(
        'mongodb+srv://harshpk:Asdf-1234@cluster0.815angp.mongodb.net/todo?retryWrites=true&w=majority'
    );
    const db = client.db();
    const todoCollection = db.collection("todo");

    const result = await todoCollection.deleteOne({ _id: new ObjectId(id) }); // Delete the todo with the given ID
    client.close();

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    res.status(200).json({ message: "Todo item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
