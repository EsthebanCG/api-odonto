CREATE DEFINER=`root`@`localhost` PROCEDURE `facturaAddorEdit`(
    IN _id INT,
    IN _tpid INT,
    IN _pid INT,
    IN _did INT,
    IN _emission DATE,
    IN _status VARCHAR(100),
    IN _topay INT,
    IN _discharged INT,
    IN _total INT
)
BEGIN 
	IF _id = 0 THEN
    INSERT INTO factura(f_id, f_tpid, f_pid, f_did, f_emission, f_status, f_topay, f_discharged, f_total)
    VALUES (_id, _tpid, _pid, _did, _emission, _status, _topay, _discharged, _total);

	SET _id = LAST_INSERT_ID();
	ELSE
    UPDATE factura
    SET
    f_id = _id,
    f_tpid = _tpid,
    f_pid = _pid,
    f_did = _did,
    f_emission = _emission,
    f_status = _status,
    f_topay = _topay,
    f_discharged = _discharged,
    f_total = _total
    WHERE f_id = _id;
	END IF;
	SELECT _id AS 'id';
END