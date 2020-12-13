const csvtojson = require("csvtojson");
const mongodb = require("mongodb").MongoClient;

csvtojson()
  .fromFile("books.csv")
  .then(csvData => { 

      let url = "mongodb://localhost:27017/";
    
      mongodb.connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err, client) => {
          if (err) throw err;
          client
            .db("books_db")
            .collection("category")
            .insertMany(csvData, (err, res) => {
              if (err) throw err;
              console.log(`Inserted: ${res.insertedCount} rows`);
              client.close();
            });
        }
      );
  });
