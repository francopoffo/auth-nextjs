import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://francosutter:O0FbQ9ZZNEKpD7oU@cluster0.jyv98uf.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}
