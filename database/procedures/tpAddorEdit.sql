CREATE DEFINER=`root`@`localhost` PROCEDURE `tpAddorEdit`(
    IN _id INT,
    IN t_tid INT,
    IN _did INT,
    IN _description VARCHAR(500),
    IN _start DATE,
    IN _end DATE,
    IN _ndates INT
)
BEGIN 
	IF _id = 0 THEN
    INSERT INTO tratamiento_paciente(tp_id, tp_tid, tp_did, tp_description, tp_start, tp_end, tp_ndates)
    VALUES (_id, _tid, _did, _description, _start, _end, _ndates);

	SET _id = LAST_INSERT_ID();
	ELSE
    UPDATE tratamiento_paciente
    SET
    tp_id = _id,
    tp_tid = _tid,
    tp_did = _did,
    tp_description = _description,
    tp_start = _start,
    tp_end = _end,
    tp_ndates = _ndates
    WHERE tp_id = _id;
	END IF;
	SELECT _id AS 'id';
END