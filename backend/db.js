const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const databaseValue = process.env.DATABASE;
const mongoURI = databaseValue
const mongoDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => 
        {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("book_items");
            fetched_data.find({}).toArray(async function (err, data) 
            {
                const book_category = await mongoose.connection.db.collection("book_category");
                book_category.find({}).toArray(function(err,catData){
                    if (err)
                {
                    console.log(err);
                } 
                else 
                {
                    global.book_items = data;
                    global.book_category = catData;
                    
                }

                })
                // if (err)
                // {
                //     console.log(err);
                // } 
                // else 
                // {
                //     global.book_items = data;
                //     //console.log(global.book_items);
                // }
                
            })
        });
    }
    catch (error) 
    {
        console.log(error);
    }
}
module.exports = mongoDB;
