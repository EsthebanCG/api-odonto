CREATE DEFINER=`root`@`localhost` PROCEDURE `oAddorEdit`(
    IN _id INT,
    IN _hc INT,
    IN _datecapture DATE,
    IN _teethcollection JSON,
    IN _remark VARCHAR(500)
)
BEGIN 
	IF _id = 0 THEN
    INSERT INTO odontograma(o_id, o_hc, o_datecapture, o_teethcollection, o_remark)
    VALUES (_id, _hc, _datecapture, _teethcollection, _remark);

	SET _id = LAST_INSERT_ID();
	ELSE
    UPDATE odontograma
    SET
    o_id = _id,
    o_hc = _hc,
    o_datecapture = _datecapture,
    o_teethcollection = _teethcollection,
    o_remark = _remark
    WHERE o_id = _id;
	END IF;
	SELECT _id AS 'id';
END

