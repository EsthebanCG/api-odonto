/*
    Rutas de admin
    host + /api/admin
*/

const express = require('express');
const router = express.Router();
const pool = require('../database/database');


// GET ALL ADMINS
router.get('/api/admin', (req, res) => {
  pool.query('SELECT * FROM adm', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});


// GET ONE ADMIN
router.get('/api/admin/:id', (req, res) => {
    const { a_id } = req.params;
    pool.query('SELECT * FROM adm WHERE a_id = ?', [a_id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
    });
});

module.exports = router;