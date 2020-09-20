const messages = require('../data/messages.json');
const { getAllUsers, sendMessage, getUsersMessages } = require('./../handlers/mysqlHandler');

const getMessagesHandler = (req, res) => {
    // const messages=[{"id":1,"message":"bla bla bla"},{"id":2,"message":"xxxxx"}]
    // const messages=messages
    const id = req.query.id;
    res.status(200).send(messages)
    return;
}


const getUserMessagesHandler =async (req, res) => {
    try {
        const id = req.query.id;
        const result = await getUsersMessages(id)
        return res.status(200).send(result)   
    } catch (error) {
        return res.status(500).send('Something went wrong')
    }    
}

const postMessageHandler = async (req, res) => {
    const message = req.body;
    try {
        await sendMessage(message.payload);
        return res.status(200).send('ok')
    } catch (error) {
        return res.status(500).send('something went wrong')
    }
}


module.exports = {
    getMessagesHandler,
    postMessageHandler,
    getUserMessagesHandler
}