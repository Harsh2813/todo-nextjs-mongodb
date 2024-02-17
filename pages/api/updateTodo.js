import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    const { id, status } = req.body; // Extract todo item ID and status from request body
    if (!id || !status) {
      return res.status(400).json({ error: "Missing ID or status" });
    }

    const client = await MongoClient.connect(
        'mongodb+srv://harshpk:Asdf-1234@cluster0.815angp.mongodb.net/todo?retryWrites=true&w=majority'
    );
    const db = client.db();
    const todoCollection = db.collection("todo");

    const result = await todoCollection.findOneAndUpdate(
      { _id: new ObjectId(id) }, // Filter by todo item ID
      { $set: { status: status } }, // Update the status field, set batata h konsi feild update krna ni agar use ni karenge set ko to pura data hi replace krke update kr sakta h mongo
      //{ returnOriginal: false } // Return the updated document it is optional to use if you don't want in return
    );

    client.close();

    if (!result.value) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    res
      .status(200)
      .json({ message: "Todo item updated successfully", todo: result.value });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
