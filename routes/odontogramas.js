/*
    Rutas de odontogramas
    host + /api/odontogramas
*/

const express = require('express');
const router = express.Router();
const pool = require('../database/database');

// GET ALL ODONTOGRAMS
router.get('/api/odontogramas', (req, res) => {
  pool.query('SELECT * FROM odontograma', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET ONE ODONTOGRAM
router.get('/api/odontogramas/:id', (req, res) => {
    const { o_id } = req.params;
    pool.query('SELECT * FROM odontograma WHERE o_id = ?', [o_id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
    });
});

// INSERT AN ODONTOGRAM

router.post('/api/odontogramas', (req,res) => {
    const { o_id, o_hc, o_datecapture, o_teethcollection, o_remark } = req.body;
    query = `
      SET @o_id = ?;
      SET @o_hc = ?;
      SET @o_datecapture = ?;
      SET @o_teethcollection = ?;
      SET @o_remark = ?;
      CALL oAddorEdit(@o_id, @o_hc, @o_datecapture, @o_teethcollection, @o_remark);
    `;
    pool.query(query, [o_id, o_hc, o_datecapture, o_teethcollection, o_remark], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Odontograma guardado'});
        } else {
            console.log(err);
        }
    });
});

// DELETE AN ODONTOGRAM
router.delete('/api/odontogramas/:id', (req, res) => {
    const { o_id } = req.params;
    pool.query('DELETE FROM odontograma WHERE o_id = ?', [o_id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Odontograma eliminado'});
      } else {
        console.log(err);
      }
    });
  });

// MODIFY AN ODONTOGRAM

router.put('/api/odontogramas/:id', (req, res) => {
    const { o_hc, o_datecapture, o_teethcollection, o_remark } = req.body;
    const { o_id } = req.params;
    const query = `
    SET @o_id = ?;
    SET @o_hc = ?;
    SET @o_datecapture = ?;
    SET @o_teethcollection = ?;
    SET @o_remark = ?;
    CALL oAddorEdit(@o_id, @o_hc, @o_datecapture, @o_teethcollection, @o_remark);
    `;
    pool.query(query, [o_id, o_hc, o_datecapture, o_teethcollection, o_remark], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Odontograma modificado'});
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;