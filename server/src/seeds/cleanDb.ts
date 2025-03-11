import models from '../models/index.js';
import db from '../config/connection.js';
import { Model } from 'mongoose';

export default async function cleanDb(modelName: string, collectionName: string) {
  try {
    // Explicitly assert the models object to allow string indexing
    const modelMap = models as Record<string, Model<any>>;

    if (!modelMap[modelName]) {
      throw new Error(`❌ Model '${modelName}' not found. Available models: ${Object.keys(models).join(', ')}`);
    }

    const model = modelMap[modelName];

    if (!model.db) {
      throw new Error(`❌ Model '${modelName}' does not have a valid database connection.`);
    }

    if (!db.db) {
      throw new Error(`❌ MongoDB database connection is not established.`);
    }

    console.log(`🔹 Checking for collection: ${collectionName}`);

    const collections = await db.db.listCollections({ name: collectionName }).toArray();

    if (collections.length > 0) {
      console.log(`⚠️ Dropping collection: ${collectionName}`);
      await db.db.dropCollection(collectionName);
    } else {
      console.log(`✅ Collection '${collectionName}' does not exist. No action needed.`);
    }
  } catch (err) {
    console.error("❌ Error in cleanDb:", err);
    throw err;
  }
}
