/*drop FUNCTION create_horario;
drop FUNCTION create_servicios_dia;
CREATE OR REPLACE FUNCTION create_servicios_dia(fecha_inicio date, fecha_fin date,id_horario int, num_alumno int, programa varchar)
RETURNS void AS $$
BEGIN
	WHILE fecha_inicio <= fecha_fin LOOP
		INSERT INTO Servicios_dia VALUES(id_horario,fecha_inicio,programa,num_alumno);
		fecha_inicio = fecha_inicio + interval '1 day';
	END LOOP;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_horario(salon varchar, fecha_inicio date, fecha_fin date, no_clase_r varchar, dia varchar, hora_inicio time, hora_fin time)
RETURNS void AS $$
DECLARE
	id_horario_r int;
	programa_r varchar;
	num_alumnos_r int;
BEGIN
	INSERT INTO Horario(salon,fecha_inicio,fecha_fin,no_clase,dia,hora_inicio,hora_fin)VALUES(salon,fecha_inicio,fecha_fin,no_clase_r,dia,hora_inicio,hora_fin) RETURNING id_horario INTO id_horario_r;
	programa_r = (SELECT programa FROM Clase_programa WHERE Clase_programa.no_clase = no_clase_r);
	num_alumnos_r = (SELECT num_alunos FROM Clase_programa WHERE Clase_programa.no_clase = no_clase_r and Clase_programa.programa = programa);
	PERFORM create_servicios_dia(fecha_inicio,fecha_fin,id_horario_r,num_alumnos_r,programa_r);
END;
$$ LANGUAGE plpgsql;
select create_horario('SF_6-2','2023-01-16','2023-01-16','8784','Lunes','17:00:00','21:00:00');*/