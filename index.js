const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// async function run() {}
// user: webguru1;
// pass: x2pEnLdnLHPrUCS4;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://webguru:pcfJ0QzFSNRpr7Ny@cluster0.epiqiul.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const userCollection = client.db("nodeMongoCrud").collection("users");

    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.delete("/delete/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      // console.log("Trying to delete ", id);
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
};
run().catch((err) => console.error(err));
app.get("/", (req, res) => {
  res.send("Hello from node mon CRUD server");
});

app.listen(port, () => {
  console.log(`Node CRUD server is Running on port : ${port}`);
});
