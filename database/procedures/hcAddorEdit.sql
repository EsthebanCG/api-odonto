CREATE DEFINER=`root`@`localhost` PROCEDURE `hcAddorEdit`(
    IN _id INT,
    IN _pid INT,
    IN _tpid INT,
    IN _amnamesis VARCHAR(500),
    IN _comment VARCHAR(500)
)
BEGIN 
	IF _id = 0 THEN
    INSERT INTO historia_clinica(hc_id, hc_pid, hc_tpid, hc_amnamesis, hc_comment)
    VALUES (_id, _pid, _tpid, _amnamesis, _comment);

	SET _id = LAST_INSERT_ID();
	ELSE
    UPDATE historia_clinica
    SET
    hc_id = _id,
    hc_pid = _pid,
    hc_tpid = _tpid,
    hc_amnamesis = _amnamesis,
    hc_comment = _comment
    WHERE hc_id = _id;
	END IF;
	SELECT _id AS 'id';
END

