/*
    Rutas de tratamiento_paciente
    host + /api/tratamientos
*/

const express = require('express');
const router = express.Router();
const pool = require('../database/database');


// GET ALL TREATMENTS (PATIENT)
router.get('/api/tratamientos', (req, res) => {
  pool.query('SELECT * FROM tratamiento_paciente', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});


// GET ONE TREATMENT (PATIENT)
router.get('/api/tratamientos/:id', (req, res) => {
    const { tp_id } = req.params;
    pool.query('SELECT * FROM tratamiento_paciente WHERE tp_id = ?', [tp_id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
    });
});

// INSERT A TREATMENT (PATIENT)

router.post('/api/tratamientos', (req,res) => {
    const { tp_id, tp_tid, tp_did, tp_description, tp_start, tp_end, tp_ndates } = req.body;
    query = `
    SET @tp_id = ?;
    SET @tp_tid = ?;
    SET @tp_did = ?;
    SET @tp_description = ?;
    SET @tp_start = ?;
    SET @tp_end = ?;
    SET @tp_ndates = ?;
    CALL tpAddorEdit(@tp_id, @tp_tid, @tp_did, @tp_description, @tp_start, @tp_end, @tp_ndates);
    `;
    pool.query(query, [tp_id, tp_tid, tp_did, tp_description, tp_start, tp_end, tp_ndates], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Tramiento asignado'});
        } else {
            console.log(err);
        }
    });
});

// DELETE A TREATMENT (PATIENT)
router.delete('/api/tratamientos/:id', (req, res) => {
    const { tp_id } = req.params;
    pool.query('DELETE FROM tratamiento_paciente WHERE tp_id = ?', [tp_id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Tratamiento eliminado'});
      } else {
        console.log(err);
      }
    });
  });

// MODIFY A TREATMENTS (PATIENT)

router.put('/api/tratamientos/:id', (req, res) => {
    const { tp_tid, tp_did, tp_description, tp_start, tp_end, tp_ndates } = req.body;
    const { tp_id } = req.params;
    const query = `
    SET @tp_id = ?;
    SET @tp_tid = ?;
    SET @tp_did = ?;
    SET @tp_description = ?;
    SET @tp_start = ?;
    SET @tp_end = ?;
    SET @tp_ndates = ?;
    CALL tpAddorEdit(@tp_id, @tp_tid, @tp_did, @tp_description, @tp_start, @tp_end, @tp_ndates);
    `;
    pool.query(query, [tp_id, tp_tid, tp_did, tp_description, tp_start, tp_end, tp_ndates], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Tratamiento modificado'});
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;