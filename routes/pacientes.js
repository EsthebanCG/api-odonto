/*
    Rutas de pacientes por c/ doctor
    host + /api/pacientes
*/

const express = require('express');
const router = express.Router();
const pool = require('../database/database');


// GET ALL PATIENTS
router.get('/api/pacientes', (req, res) => {
  pool.query('SELECT * FROM paciente', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});


// GET ONE PATIENT
router.get('/api/pacientes/:id', (req, res) => {
    const { p_id } = req.params;
    pool.query('SELECT * FROM paciente WHERE p_id = ?', [p_id], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
    });
});

// INSERT A PATIENT

router.post('/api/pacientes', (req,res) => {
    const { p_id, p_doctor, p_name, p_lastname, p_birthday, p_age, p_gender, p_img, p_dni, p_address, p_cellphone, p_email, p_weight, p_height, p_allergy } = req.body;
    query = `
      SET @p_id = ?;
      SET @p_doctor = ?;
      SET @p_name = ?;
      SET @p_lastname = ?;
      SET @p_birthday = ?;
      SET @p_age =?;
      SET @p_gender =?;
      SET @p_img = ?;
      SET @p_dni = ?;
      SET @p_address = ?;
      SET @p_cellphone = ?;
      SET @p_email = ?;
      SET @p_weight = ?;
      SET @p_height = ?;
      SET @p_allergy = ?;
      CALL pacienteAddorEdit(@p_id, @p_doctor, @p_name, @p_lastname, @p_birthday, @p_age, @p_gender, @p_img, @p_dni, @p_address, @p_cellphone, @p_email, @p_weight, @p_height, @p_allergy);
    `;
    pool.query(query, [p_id, p_doctor, p_name, p_lastname, p_birthday, p_age, p_gender, p_img, p_dni, p_address, p_cellphone, p_email, p_weight, p_height, p_allergy], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Paciente guardado'});
        } else {
            console.log(err);
        }
    });
});

// DELETE A PATIENT
router.delete('/api/pacientes/:id', (req, res) => {
    const { p_id } = req.params;
    pool.query('DELETE FROM paciente WHERE p_id = ?', [p_id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Paciente eliminado'});
      } else {
        console.log(err);
      }
    });
  });

// MODIFY A PATIENT

router.put('/api/pacientes/:id', (req, res) => {
    const { p_doctor, p_name, p_lastname, p_birthday, p_age, p_gender, p_img, p_dni, p_address, p_cellphone, p_email, p_weight, p_height, p_allergy } = req.body;
    const { p_id } = req.params;
    const query = `
    SET @p_id = ?;
    SET @p_doctor = ?;
    SET @p_name = ?;
    SET @p_lastname = ?;
    SET @p_birthday = ?;
    SET @p_age = ?;
    SET @p_gender = ?;
    SET @p_img = ?;
    SET @p_dni = ?;
    SET @p_address = ?;
    SET @p_cellphone = ?;
    SET @p_email = ?;
    SET @p_weight = ?;
    SET @p_height = ?;
    SET @p_allergy = ?;
    CALL pacienteAddorEdit(@p_id, @p_doctor, @p_name, @p_lastname, @p_birthday, @p_age, @p_gender, @p_img, @p_dni, @p_address, @p_cellphone, @p_email, @p_weight, @p_height, @p_allergy);
    `;
    pool.query(query, [p_id, p_doctor, p_name, p_lastname, p_birthday, p_age, p_gender, p_img, p_dni, p_address, p_cellphone, p_email, p_weight, p_height, p_allergy], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Paciente modificado'});
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;
