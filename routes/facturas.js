/*
    Rutas de facturas
    host + /api/facturas
*/

const express = require('express');
const router = express.Router();
const pool = require('../database/database');

// GET ALL BILLS
router.get('/api/facturas', (req, res) => {
  pool.query('SELECT * FROM factura', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET ONE BILL
router.get('/api/facturas/:id', (req, res) => {
    const { f_id } = req.params;
    pool.query('SELECT * FROM factura WHERE f_id = ?', [f_id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
    });
});

// INSERT A BILL

router.post('/api/facturas', (req,res) => {
    const { f_id, f_tpid, f_pid, f_pid, f_emission, f_status, f_topay, f_discharged, f_total } = req.body;
    query = `
      SET @f_id = ?;
      SET @f_tpid = ?;
      SET @f_pid = ?;
      SET @f_did = ?;
      SET @f_emission = ?;
      SET @f_status =?;
      SET @f_topay = ?;
      SET @f_discharged = ?;
      SET @f_total = ?;
      CALL facturaAddorEdit(@f_id, @f_tpid, @f_pid, @f_pid, @f_emission, @f_status, @f_topay, @f_discharged, @f_total);
    `;
    pool.query(query, [f_id, f_tpid, f_pid, f_pid, f_emission, f_status, f_topay, f_discharged, f_total], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Factura guardada'});
        } else {
            console.log(err);
        }
    });
});

// DELETE A BILL
router.delete('/api/facturas/:id', (req, res) => {
    const { f_id } = req.params;
    pool.query('DELETE FROM factura WHERE f_id = ?', [f_id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Factura eliminada'});
      } else {
        console.log(err);
      }
    });
  });

// MODIFY A BILL

router.put('/api/facturas/:id', (req, res) => {
    const { f_tpid, f_pid, f_pid, f_emission, f_status, f_topay, f_discharged, f_total } = req.body;
    const { f_id } = req.params;
    const query = `
    SET @f_id = ?;
    SET @f_tpid = ?;
    SET @f_pid = ?;
    SET @f_did = ?;
    SET @f_emission = ?;
    SET @f_status = ?;
    SET @f_topay = ?;
    SET @f_discharged = ?;
    SET @f_total = ?;
    CALL facturaAddorEdit(@f_id, @f_tpid, @f_pid, @f_pid, @f_emission, @f_status, @f_topay, @f_discharged, @f_total);
    `;
    pool.query(query, [f_id, f_tpid, f_pid, f_pid, f_emission, f_status, f_topay, f_discharged, f_total], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Factura modificada'});
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;