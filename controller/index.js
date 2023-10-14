const Account = require("../models/Account");

const findData = async (filter) => {
    const result = await Account.find(filter);
    // console.log("filter", filter, result);
    return result;
}

const findByMint = async ( req, res, next ) => {
    try {
        const mint = req.params.mint;
        const data = await findData({mint});
        return res.json({data})
    } catch (error) {
        next(error)
    }
}

const findByStatus = async ( req, res, next ) => {
    try {
        const status = req.params.status;
        const data = await findData({status});
        return res.json({data})
    } catch (error) {
        next(error)
    }
}

const findByOwner = async ( req, res, next ) => {
    try {
        const owner = req.params.owner;
        const data = await findData({owner});
        return res.json({data})
    } catch (error) {
        next(error)
    }
}

const insert = async (data) => {
    const item = new Account(data);
    await item.save();
}

const insertData = async ( req, res, next ) => {
    try {
        await insert(req.body);
        res.json({status: true});
    } catch (error) {
        next(error);
    }
}

const getOrInsertNftData = async ( req, res, next ) => {
    try {
        const result = req.body;
        const data = await findData({mint: result.mint});
        if(data.length <= 0){
            await insert({mint: result.mint, owner: result.owner, status: 0});
            return res.json([{mint: result.mint, owner: result.owner, status: 0}])
        } else {
            if(result.owner != data[0].owner) {
                await Account.findOneAndUpdate({mint: result.mint}, {owner: result.owner});
                return res.json([{mint: result.mint, owner: result.owner, status: data[0].status}])
            }
            return res.json(data)
        }
    } catch (error) {
        next(error);
        // return res.json(null)
    }
}

const getOrInsertData = async ( req, res, next ) => {
    try {
        const mint = req.params.mint;
        const data = await findData({mint});
        if(data.length <= 0){
            await insert( {mint: mint, owner: mint, status: 0} );
            return res.json([{mint: mint, owner: mint, status: 0}])
        } else {
            return res.json(data)
        }
    } catch (error) {
        next(error);
    }
}

const updateData = async ( req, res, next ) => {
    try {
        const {owner, prevStatus, status} = req.body;
                
        await Account.findOneAndUpdate({owner, status: prevStatus}, {status});
        res.json({status: true});     
    } catch (error) {
        next(error);
    }
}

module.exports = {
    findByMint,
    findByStatus,
    findByOwner,
    getOrInsertData,
    getOrInsertNftData,
    insert,
    insertData,
    updateData
}
