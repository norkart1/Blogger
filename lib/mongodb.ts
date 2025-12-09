import { MongoClient, type Db } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || ""

if (!MONGODB_URI) {
  console.warn("MONGODB_URI environment variable is not set")
}

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable")
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const db = client.db("library_management")

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function getCollection<T extends Document>(collectionName: string) {
  const { db } = await connectToDatabase()
  return db.collection<T>(collectionName)
}
