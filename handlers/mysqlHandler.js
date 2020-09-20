const mysql = require('mysql');
const config = require('config')
const dbConfig = config.get('mysql')
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
})

connection.connect();


const getAllUsers = () => {
    connection.query('SELECT * FROM users ', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
}


const getUsersMessages = (id) => {
    return new Promise((resolve,reject)=>{
        let query = `SELECT * from messages WHERE receiver_id='${id}'`;
        connection.query(query, function (error, results, fields) {
            if (error){
                reject(error);
            } 
            resolve(results)        
        });
    })
}


const sendMessage = (message) => {
    return new Promise((resolve,reject)=>{
        let query = `INSERT INTO messages (subject, message_body, sender_id, receiver_id) 
        VALUES('${message.subject}', '${message.message_body}', '${message.senderId}', '${message.receiverId}')`;

        connection.query(query, function (error, results, fields) {
            if (error){
                reject(error);
            } 
            resolve(results)        
        });
    })
}

module.exports = {
    getAllUsers,
    sendMessage,
    getUsersMessages
}