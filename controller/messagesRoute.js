const messages = [];

const getUserMessagesHandler = (req, res) => {
    const receiverId = req.query.id;
    const messagesToReturn = [];
    for (const message of messages) {
        if (message.senderId === receiverId || message.receiverId === receiverId) {
            messagesToReturn.push(message)
        }
    }
    return res.status(200).send(messagesToReturn);
}

const postMessageHandler = (req, res) => {
    let message = req.body
    message.id = Date.now().toString();
    if (message.receiverId && message.senderId) {
        messages.push(message);
        console.log('messages :', messages)
        return res.status(200).send('ok')
    } else {
        return res.status(404).send('Something went wrong')
    }
}

const deleteMessageHandler = (req, res) => {
    const id = req.query[0];
    for (let index = 0; index < messages.length; index++) {
        const message = messages[index];
        if (message.id === id) {
            messages.splice(index, 1)
        }
    }
    console.log('messages :', messages)
    res.status(200).send(messages)
}



module.exports = {
    // getMessagesHandler,
    postMessageHandler,
    getUserMessagesHandler,
    deleteMessageHandler
}