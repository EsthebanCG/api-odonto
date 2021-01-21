/*
    Rutas de citas
    host + /api/citas
*/

const express = require('express');
const router = express.Router();
const pool = require('../database/database');


// GET ALL APPOINTMENTS
router.get('/api/citas', (req, res) => {
  pool.query('SELECT * FROM cita', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});


// GET ONE APPOINTMENT
router.get('/api/citas/:id', (req, res) => {
    const { c_id } = req.params;
    pool.query('SELECT * FROM cita WHERE c_id = ?', [c_id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
    });
});


// INSERT AN APPOINTMENT

router.post('/api/citas', (req,res) => {
    const { c_id, c_pid, c_tpid, c_title, c_description, c_start, c_end, c_status } = req.body;
    query = `
      SET @c_id = ?;
      SET @c_pid = ?;
      SET @c_tpid = ?;
      SET @c_title = ?;
      SET @c_description = ?;
      SET @c_start =?;
      SET @c_end =?;
      SET @c_status =?;
      CALL citaAddorEdit(@c_id, @c_pid, @c_tpid, @c_title, @c_description, @c_start, @c_end, @c_status);
    `;
    pool.query(query, [c_id, c_pid, c_tpid, c_title, c_description, c_start, c_end, c_status], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Cita guardada'});
        } else {
            console.log(err);
        }
    });
});

// DELETE AN APPOINTMENT
router.delete('/api/citas/:id', (req, res) => {
    const { c_id } = req.params;
    pool.query('DELETE FROM cita WHERE c_id = ?', [c_id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Cita eliminada'});
      } else {
        console.log(err);
      }
    });
  });

// MODIFY AN APPOINTMENT

router.put('/api/citas/:id', (req, res) => {
    const { c_pid, c_tpid, c_title, c_description, c_start, c_end, c_status } = req.body;
    const { c_id } = req.params;
    const query = `
      SET @c_id = ?;
      SET @c_pid = ?;
      SET @c_tpid = ?;
      SET @c_title = ?;
      SET @c_description = ?;
      SET @c_start =?;
      SET @c_end =?;
      SET @c_status =?;
      CALL citaAddorEdit(@c_id, @c_pid, @c_tpid, @c_title, @c_description, @c_start, @c_end, @c_status);
    `;
    pool.query(query, [c_id, c_pid, c_tpid, c_title, c_description, c_start, c_end, c_status], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Cita modificada'});
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;