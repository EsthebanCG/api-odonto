/*
    Rutas de historias clinicas
    host + /api/historias
*/

const express = require('express');
const router = express.Router();
const pool = require('../database/database');

// GET ALL HISTORIES
router.get('/api/historias', (req, res) => {
  pool.query('SELECT * FROM historia_clinica', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET ONE HISTORY
router.get('/api/historias/:id', (req, res) => {
    const { hc_id } = req.params;
    pool.query('SELECT * FROM historia_clinica WHERE hc_id = ?', [hc_id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
    });
});

// INSERT A HISTORY

router.post('/api/historias', (req,res) => {
    const { hc_id, hc_pid, hc_tpid, hc_amnamesis, hc_comment } = req.body;
    query = `
      SET @hc_id = ?;
      SET @hc_pid = ?;
      SET @hc_tpid = ?;
      SET @hc_amnamesis = ?;
      SET @hc_comment = ?;
      CALL hcAddorEdit(@hc_id, @hc_pid, @hc_tpid, @hc_amnamesis, @hc_comment);
    `;
    pool.query(query, [hc_id, hc_pid, hc_tpid, hc_amnamesis, hc_comment], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Factura guardada'});
        } else {
            console.log(err);
        }
    });
});

// DELETE A HISTORY
router.delete('/api/historias/:id', (req, res) => {
    const { hc_id } = req.params;
    pool.query('DELETE FROM historia_clinica WHERE hc_id = ?', [hc_id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Historia clínica eliminada'});
      } else {
        console.log(err);
      }
    });
  });

// MODIFY A HISTORY

router.put('/api/historias/:id', (req, res) => {
    const { hc_pid, hc_tpid, hc_amnamesis, hc_comment } = req.body;
    const { hc_id } = req.params;
    const query = `
    SET @hc_id = ?;
    SET @hc_pid = ?;
    SET @hc_tpid = ?;
    SET @hc_amnamesis = ?;
    SET @hc_comment = ?;
    CALL hcAddorEdit(@hc_id, @hc_pid, @hc_tpid, @hc_amnamesis, @hc_comment);
    `;
    pool.query(query, [hc_id, hc_pid, hc_tpid, hc_amnamesis, hc_comment], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Factura modificada'});
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;