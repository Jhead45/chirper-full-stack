const mysql = require('mysql');
import { config } from './config';


let pool = mysql.createPool({
    connectionLimit: 10,
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DATABASE
});

function getChirps() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM chirps', (err, results, fields) => {
                if (err) {
                    reject(err);
                    console.log('You have an error!');
                }

                let chirps = results.map((chirp) => {
                    return {
                        text: chirp.text,
                        id: chirp.id,
                    };
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
            connection.query(
                `SELECT * FROM chirps where id = ${id}`,
                (err, results, fields) => {
                    if (err) {
                        reject(err);
                        console.log('You have an error!');
                    }

                    resolve(results);
                    connection.release();
                }
            );
        });
    });
}

function deleteChirp(id) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(
                `DELETE FROM chirps where id = ${id}`,
                (err, results, fields) => {
                    if (err) {
                        reject(err);
                        console.log('You have an error!');
                    }

                    resolve(results);
                    connection.release();
                }
            );
        });
    });
}

function createChirp(userid, text, location) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(
                `INSERT INTO chirps (userid, text, location) VALUES ( ${userid}, '${text}', '${location}')`,
                (err, results, fields) => {
                    if (err) {
                        reject(err);
                        console.log('You have an error!');
                    }
                    let chirpid = results.insertId;
                    locateMentions(text, chirpid);

                    resolve(results);
                    connection.release();
                }
            );
        });
    });
}

function updateChirp(id, text) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(
                `UPDATE chirps SET text = '${text}' where id = ${id}`,
                (err, results, fields) => {
                    if (err) {
                        reject(err);
                        console.log('You have an error!');
                    }

                    resolve(results);
                    connection.release();
                }
            );
        });
    });
}

function addMentions(userid, chirpid) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(
                `INSERT INTO mentions (userid, chirpid) VALUES ( ${userid}, ${chirpid})`,
                (err, results, fields) => {
                    if (err) {
                        reject(err);
                        console.log('You have an error!');
                    }

                    resolve(results);
                    connection.release();
                }
            );
        });
    });
}

function userMentions(userid) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(
                `Call spUserMentions(${userid})`,
                (err, results, fields) => {
                    if (err) {
                        reject(err);
                        console.log('You have an error!');
                    }

                    resolve(results);
                    connection.release();
                }
            );
        });
    });
}

function locateMentions(text, chirpid) {
    let string = text;
    let array = string.split(' ');
    for (var i = 0; i < array.length; i++) {
        if (array[i].charCodeAt(0) == 64) {
            let name = array[i].substring(1);

            return new Promise((resolve, reject) => {
                pool.getConnection((err, connection) => {
                    connection.query(
                        `SELECT id FROM users WHERE name LIKE '%${name}%'`,
                        (err, results, fields) => {
                            if (err) {
                                reject(err);
                                console.log('You have an error!');
                            } else {
                                let userid = results[0].id;
                                addMentions(userid, chirpid);
                            }

                            resolve(results);

                            connection.release();
                        }
                    );
                });
            });
        } else {
            console.log('No mentions in this chirp!');
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
    locateMentions: locateMentions,
};
