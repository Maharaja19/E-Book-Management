const { MongoClient } = require('mongodb');

// Replace with your MongoDB Atlas connection string
const uri = "mongodb+srv://mmaharaja1964:ATLASmongo@cluster0.9z7cwkh.mongodb.net/E_book/E_book?retryWrites=true&w=majority";

// Database name from your connection string
const dbName = "E_book";

async function checkAtlasData() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");

    // Connect to the database
    const db = client.db(dbName);
    
    // List all collections in the database
    const collections = await db.listCollections().toArray();
    console.log("\nCollections in the database:");
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    // Check each collection for documents
    console.log("\nDocument counts in each collection:");
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`- ${collection.name}: ${count} documents`);
      
      // Show sample documents (first 3) from each collection
      if (count > 0) {
        console.log(`  Sample documents from ${collection.name}:`);
        const samples = await db.collection(collection.name).find().limit(3).toArray();
        samples.forEach((doc, index) => {
          console.log(`    ${index + 1}. ${JSON.stringify(doc, null, 2)}`);
        });
      }
      console.log("");
    }
    
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  } finally {
    // Close the connection
    await client.close();
    console.log("Connection closed");
  }
}

// Run the function
checkAtlasData();