/*
    Rutas de tipos de tratamiento
    host + /api/tipos
*/

const express = require('express');
const router = express.Router();
const pool = require('../database/database');


// GET ALL TYPES
router.get('/api/tipos', (req, res) => {
  pool.query('SELECT * FROM tipo_tratamiento', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET ONE TYPE
router.get('/api/tipos/:id', (req, res) => {
    const { t_id } = req.params;
    pool.query('SELECT * FROM tipo_tratamiento WHERE t_id = ?', [t_id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
    });
});

module.exports = router;