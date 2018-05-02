const mysql = require('mysql');

let pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        database: 'chirpr',
        user: 'chirprapp',
        password: 'somePassword'
    });



function getChirps() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM chirps' , (err, results, fields) => {
            if (err) {
                reject(err);
                console.log('You have an error!');
            } 

            let chirps = results.map((chirp) => {
                return({
                    text: chirp.text,
                    id: chirp.id
                });
            });
            resolve(chirps);
            connection.release();
        });
      });
    });
}

function getChirp(id) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(`SELECT * FROM chirps where id = ${id}` , (err, results, fields) => {

                if (err) {
                    reject(err);
                    console.log('You have an error!');
                } 
              
            resolve(results);
            connection.release();
        });
    });
  });
}

function deleteChirp(id) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(`DELETE FROM chirps where id = ${id}`, (err, results, fields) => {
                
                if (err) {
                    reject(err);
                    console.log('You have an error!');
                }

            resolve(results);
            connection.release();
            });
        });
    });
}

function createChirp(userid, text, location) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(`INSERT INTO chirps (userid, text, location) VALUES ( ${userid}, '${text}', '${location}')`, (err, results, fields) => {

                if (err) {
                    reject(err);
                    console.log('You have an error!');
                }
                
            resolve(results);
            connection.release();
            });
        });
    });

}

function updateChirp(id, text) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(`UPDATE chirps SET text = '${text}' where id = ${id}`, (err, results, fields) => {

                if (err) {
                    reject(err);
                    console.log('You have an error!');
                }

            resolve(results);
            connection.release();
            })
        })
    })
}


function addMentions(userid, id) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(`INSERT INTO mentions (userid, chirpid) VALUES ( ${userid}, ${id})`, (err, results, fields) => {

                if (err) {
                    reject(err);
                    console.log('You have an error!');
                }
                
            resolve(results);
            connection.release();
            });
        });
    });

}

function userMentions(userid) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(`Call spUserMentions(${userid})`, (err, results, fields) => {

                if (err) {
                    reject(err);
                    console.log('You have an error!');
                }
                
            resolve(results);
            connection.release();
            });
        });
    })
}




module.exports = {
    getChirps: getChirps,
    getChirp: getChirp,
    deleteChirp: deleteChirp,
    createChirp: createChirp,
    updateChirp: updateChirp,
    addMentions: addMentions,
    userMentions: userMentions
}


