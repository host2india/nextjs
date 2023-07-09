import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://mintdollars:lUI4SmgYjh1cEbZ4@nextauth.5dyiz2b.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI
const dbName = 'mintdollars'; // Replace with your MongoDB database name
const collectionName = 'NextAuth'; // Replace with your MongoDB collection name

// Function to establish a MongoDB connection
async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return { client, collection };
}

// Function to insert a document
export async function insertDocument(document) {
  const { client, collection } = await connectToDatabase();
  const result = await collection.insertOne(document);
  client.close();
  return result;
}

// Function to update a document
export async function updateDocument(filter, update) {
  const { client, collection } = await connectToDatabase();
  const result = await collection.updateOne(filter, update);
  client.close();
  return result;
}

// Function to delete a document
export async function deleteDocument(filter) {
  const { client, collection } = await connectToDatabase();
  const result = await collection.deleteOne(filter);
  client.close();
  return result;
}

// Function to fetch documents
export async function fetchDocuments() {
  const { client, collection } = await connectToDatabase();
  const documents = await collection.find({}).toArray();
  client.close();
  return documents;
}
