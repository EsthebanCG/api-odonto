/*
    Rutas de solicitudes
    host + /api/solicitudes
*/

const express = require('express');
const router = express.Router();
const pool = require('../database/database');


// GET ALL REQUESTS
router.get('/api/solicitudes', (req, res) => {
  pool.query('SELECT * FROM solicitud', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET ONE REQUEST
router.get('/api/solicitudes/:id', (req, res) => {
    const { s_id } = req.params;
    pool.query('SELECT * FROM solicitud WHERE s_id = ?', [s_id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
    });
});

module.exports = router;