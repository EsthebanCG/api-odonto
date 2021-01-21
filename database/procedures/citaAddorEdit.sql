CREATE DEFINER=`root`@`localhost` PROCEDURE `citaAddorEdit`(
    IN _id INT,
    IN _did INT,
    IN _pid INT,
    IN _tpid INT,
    IN _title VARCHAR(100),
    IN _description VARCHAR(500),
    IN _start DATETIME,
    IN _end DATETIME,
    IN _status VARCHAR(500)
)
BEGIN 
	IF _id = 0 THEN
    INSERT INTO cita(c_id, c_did, c_pid, c_tpid, c_title, c_description, c_start, c_end, c_status)
    VALUES (_id, _did, _pid, _tpid, _title, _description, _start, _end, c_status);

	SET _id = LAST_INSERT_ID();
	ELSE
    UPDATE cita
    SET
    c_id = _id,
    c_did = _did,
    c_pid = _pid,
    c_tpid = _tpid,
    c_title = _title,
    c_description = _description,
    c_start = _start,
    c_end = _end,
    c_status = _status
    WHERE c_id = _id;
	END IF;
	SELECT _id AS 'id';
END

