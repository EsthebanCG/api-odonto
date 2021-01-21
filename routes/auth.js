/*
    Rutas de autentificación doctores/admin
    host + /api/auth
*/

const express = require('express');
const router = express.Router();
const pool = require('../database/database');


// GET ALL USERS
router.get('/api/auth', (req, res) => {
  pool.query('SELECT * FROM auth', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});


// GET ONE USER
router.get('/api/auth/:id', (req, res) => {
    const { auth_id } = req.params;
    pool.query('SELECT * FROM auth WHERE auth_id = ?', [auth_id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
    });
});

module.exports = router;