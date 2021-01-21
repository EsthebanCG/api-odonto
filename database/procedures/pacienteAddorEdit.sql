CREATE DEFINER=`root`@`localhost` PROCEDURE `pacienteAddorEdit`(
    IN _id INT,
    IN _doctor INT,
    IN _name VARCHAR(100),
    IN _lastname VARCHAR(100),
    IN _birthday DATE, 
    IN _age INT,
    IN _gender VARCHAR(100),
    IN _img VARCHAR(100),
    IN _dni VARCHAR(100),
    IN _address VARCHAR (100),
    IN _cellphone VARCHAR(100),
    IN _email VARCHAR(100),
    IN _weight FLOAT,
    IN _height FLOAT,
    IN _allergy VARCHAR(100)
)
BEGIN 
	IF _id = 0 THEN
    INSERT INTO paciente(p_id, p_doctor, p_name, p_lastname, p_birthday, p_age, p_gender, p_img, p_dni, p_address, p_cellphone, p_email, p_weight, p_height, p_allergy)
    VALUES (_id, _doctor, _name, _lastname, _birthday, _age, _gender, _img, _dni, _address, _cellphone, _email, _weight, _height, _allergy);

	SET _id = LAST_INSERT_ID();
	ELSE
    UPDATE paciente
    SET
	p_id = _id,
    p_doctor = _doctor,
    p_name = _name,
    p_lastname = _lastname,
    p_birthday = _birthday,
    p_age = _age,
    p_gender = _gender,
    p_img = _img,
    p_dni = _dni,
    p_address = _address,
    p_cellphone = _cellphone,
    p_email = _email,
    p_weight = _weight,
    p_height = _height,
    p_allergy = _allergy
    WHERE p_id = _id;
	END IF;
	SELECT _id AS 'id';
END