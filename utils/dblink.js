const config = require("../config");
const mongoose = require("mongoose");
// const Account = require("../models");

const connectDatabase = async () => {
    try {
        console.log("url", config.database.url);
        mongoose.connect(config.database.url, {
            // 'mongodb://127.0.0.1:27017'            process.env.MONGO_URI
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log("Mongoose Connected"));
    } catch(error) {
        console.log(error);
    }
}

// const getData = async (data) => {
//     try {
//       const result = await Account.find(data)
//       return {ok: true, data: result}
  
//     } catch(err) {
//       console.log(err);
//       return {ok: false, data: null}
//     }
// }
  
// const getOrInsertData = async (owner) => {
//     const data = await getData({owner});

//     if(!data.ok || data?.data?.length === 0) {
//         await insertData(owner, owner, 0);
//         return 0;
//     }
//     return data.data[0]?.status;
// }
  
// const insertData = async (mint, owner, status) => {
//     try {
//         const account = new Account({mint, owner, status});
//         await account.save();
//         return true;
//     } catch (error) {
//         console.log(error)
//         return false;
//     }
// }
  
// const updateData = async (mint, owner, status) => {
//     try {
//         await Account.findOneAndUpdate({mint},{status});
//         return true;
//     } catch (error) {
//         console.log(error)
//         return false;
//     }
// }

module.exports = {
    connectDatabase,
    // getData,
    // getOrInsertData,
    // insertData,
    // updateData,
}
