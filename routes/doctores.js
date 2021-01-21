/*
    Rutas de doctores
    host + /api/doctores
*/

const express = require('express');
const router = express.Router();
const pool = require('../database/database');


// GET ALL DOCTORS
router.get('/api/doctores', (req, res) => {
  pool.query('SELECT * FROM doctor', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET ONE DOCTOR
router.get('/api/doctores/:id', (req, res) => {
    const { d_id } = req.params;
    pool.query('SELECT * FROM doctor WHERE d_id = ?', [d_id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
    });
});

// DELETE A DOCTOR
router.delete('/api/doctores/:id', (req, res) => {
    const { d_id } = req.params;
    pool.query('DELETE FROM doctor WHERE d_id = ?', [d_id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Doctor eliminado'});
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;