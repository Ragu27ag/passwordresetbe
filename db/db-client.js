import { MongoClient } from "mongodb";

// const URL = "mongodb://0.0.0.0:27017/";

const URL = process.env.CONNECTION_URL;

const client = new MongoClient(URL);

client.connect();

console.log("db connected");

export default client;
