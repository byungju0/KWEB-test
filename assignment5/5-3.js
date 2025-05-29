const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

app.get('/fare', async (req, res) => {
    const uid = req.query.uid;
    if (!uid) return res.status(400).send('uid required');
    let conn;
    try {
        conn = await mysql.createConnection(dbConfig);
        const [rows] = await conn.execute(`
            SELECT
                SUM(ROUND(types.fare_rate * trains.distance / 1000)) AS total_fare
            FROM tickets
            JOIN trains ON tickets.train = trains.id
            JOIN types ON trains.type = types.id
            WHERE tickets.user = ?
        `, [uid]);
        if (rows.length === 0 || rows[0].total_fare === null) {
            return res.send('Total fare of user is 0 KRW.');
        }
        res.send(`Total fare of ${uid} is ${rows[0].total_fare} KRW.`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } finally {
        if(conn) await conn.end();
    }
});

app.get('/train/status', async (req, res) => {
    const tid = req.query.tid;
    if(!tid) return res.status(400).send('tid required');
    let conn;
    try {
        conn = await mysql.createConnection(dbConfig);
        const [rows] = await conn.execute(`
            SELECT
                trains.id, types.max_seats, COUNT(tickets.id) AS occupied
            FROM trains
            JOIN types ON trains.type = types.id
            LEFT JOIN tickets ON tickets.train = trains.id
            WHERE trains.id = ?
            GROUP BY trains.id, types.max_seats
        `, [tid]);
        if(rows.length === 0){
            return res.send('Train not found');
        }
        const { max_seats, occupied } = rows[0];
        if(occupied >= max_seats){
            res.send(`Train ${tid} is sold out`);
        } else {
            res.send(`Train ${tid} is not sold out`);
        }
    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } finally {
        if (conn) await conn.end();
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});