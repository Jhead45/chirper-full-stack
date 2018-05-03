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
                // console.log(results.insertId);
                let chirpid = results.insertId;
                // console.log(chirpid);
                locateMentions(text, chirpid);

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


function addMentions(userid, chirpid) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(`INSERT INTO mentions (userid, chirpid) VALUES ( ${userid}, ${chirpid})`, (err, results, fields) => {

                if (err) {
                    reject(err);
                    console.log('You have an error!');
                }
                
            resolve(results);
            // console.log(results);
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


function locateMentions(text, chirpid) {
    // console.log(text);
    let string = text;
    let array = string.split(' ');
    // console.log(array[0].charCodeAt(0));
        for (var i = 0; i < array.length; i++) {
            if (array[i].charCodeAt(0) == 64) {
                let name = array[i].substring(1);
                // console.log(name);
            
        
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(`SELECT id FROM users WHERE name LiKE '%${name}%'`, (err, results, fields) => {

                if (err) {
                    reject(err);
                    console.log('You have an error!');
                } else {
                    // console.log(results[0].id);
                    let userid = results[0].id;
                    // console.log(userid);
                    // console.log(chirpid);
                    addMentions(userid, chirpid);
                }
                
            resolve(results);
            // console.log(results);

            connection.release();
            });
        });
    }) 
    }
   }
}



module.exports = {
    getChirps: getChirps,
    getChirp: getChirp,
    deleteChirp: deleteChirp,
    createChirp: createChirp,
    updateChirp: updateChirp,
    addMentions: addMentions,
    userMentions: userMentions,
    locateMentions: locateMentions
}


