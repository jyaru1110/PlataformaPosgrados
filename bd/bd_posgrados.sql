CREATE TABLE Personas(
	email_persona varchar NOT NULL,
	nombre varchar,
	ext varchar,
	birthday varchar,
	PRIMARY KEY(email_persona)
); 

CREATE TABLE Escuela(
	escuela varchar NOT NULL PRIMARY KEY
);

CREATE TABLE Programa(
	programa varchar NOT NULL,
	grado varchar,
	tipo varchar,
	codigo varchar,
	cuenta varchar,
	escuela varchar NOT NULL,
	
	PRIMARY KEY (programa),
	FOREIGN KEY (escuela) REFERENCES Escuela(escuela)
);

CREATE TABLE Puesto_programa(
	programa varchar,
	email_persona varchar,
	puesto varchar,
	FOREIGN KEY(programa) REFERENCES Programa(programa),
	FOREIGN KEY(email_persona) REFERENCES Personas(email_persona)
);

CREATE TABLE Modulo(
	id_curso varchar NOT NULL PRIMARY KEY,
	nombre_modulo varchar NOT NULL
);


CREATE TABLE Clase(
	no_clase varchar NOT NULL,
	id_curso varchar NOT NULL,
	PRIMARY KEY(no_clase),
    FOREIGN KEY(id_curso) REFERENCES Modulo(id_curso)
);


CREATE TABLE RolesModulo(
	id_curso varchar NOT NULL,
	email_persona varchar NOT NULL,
	rol varchar,
	FOREIGN KEY(id_curso) REFERENCES Modulo(id_curso),
	FOREIGN KEY (email_persona) REFERENCES Persona(email_persona)
);

CREATE TABLE Salon(
	salon varchar,
	isla varchar,
	sede varchar,
	capacidad int,
	PRIMARY KEY(salon)
);
CREATE TABLE Clase_programa(
	no_clase varchar,
	programa varchar,
	num_alunos int,
	FOREIGN KEY(no_clase) REFERENCES Clase(no_clase),
	FOREIGN KEY(programa) REFERENCES Programa(programa)
);


CREATE TABLE Horario(
	salon varchar,
	id_horario serial,
	fecha_inicio date,
	fecha_fin date,
	no_clase varchar,
    dia varchar,
	hora_inicio time,
	hora_fin time,
	PRIMARY KEY(id_horario),
	FOREIGN KEY(no_clase) REFERENCES Clase(no_clase),
	FOREIGN KEY(salon) REFERENCES Salon(salon)
);

CREATE TABLE Servicios_dia(
	id_horario serial,
	no_clase varchar,
	dia varchar,
	fecha date,
	hora_inicio time,
	hora_fin time,
	programa varchar,
	num_servicios int,
	estado varchar,
	salon varchar,
	FOREIGN KEY(no_clase) REFERENCES Clase(no_clase)
	ON DELETE CASCADE,
	FOREIGN KEY(programa) REFERENCES Programa(programa)
	ON DELETE CASCADE,
	FOREIGN KEY(salon) REFERENCES Salon(salon)
	ON DELETE CASCADE,
	FOREIGN KEY (id_horario) REFERENCES Horario(id_horario)
	ON DELETE CASCADE
);

CREATE TABLE receso(
	id_receso serial,
	hora_inicio time,
	hora_fin time,
	dia varchar,
	escuela varchar,
	PRIMARY KEY(id_receso),
	FOREIGN KEY(escuela) REFERENCES Escuela(escuela)
	ON DELETE CASCADE
);

CREATE TABLE Puesto_escuela(
    email_persona varchar,
    escuela varchar,
    puesto varchar,
    FOREIGN KEY(email_persona) REFERENCES Personas(email_persona),
    FOREIGN KEY(escuela) REFERENCES Escuela(escuela)
);



INSERT INTO Escuela VALUES('Ciencias de la Salud');
INSERT INTO Escuela VALUES('Comunicación');
INSERT INTO Escuela VALUES('Derecho');
INSERT INTO Escuela VALUES('Empresariales');
INSERT INTO Escuela VALUES('ESDAI');
INSERT INTO Escuela VALUES('Filosofía');
INSERT INTO Escuela VALUES('Gobierno y Economía');
INSERT INTO Escuela VALUES('Ingeniería');
INSERT INTO Escuela VALUES('Pedagogía');
INSERT INTO Escuela VALUES('Bellas Artes');
INSERT INTO Escuela VALUES('Humanidades');



select M.nombre_modulo, C.no_clase, S.isla, H.dia, H.hora_inicio, H.hora_fin, P.escuela 
from horario as H inner join salon as S on S.salon = H.salon 
inner join clase as C ON C.no_clase = H.no_clase 
inner join modulo as M on M.id_curso = C.id_curso 
inner join clase_programa on clase_programa.no_clase = C.no_clase 
inner join programa as P ON P.programa = clase_programa.programa;

select S.isla, count(H.no_clase) from salon as S inner join horario as H on H.salon = S.salon  where H.dia='Lunes' group by isla;

select create_servicios_dia('12813','1160','Viernes','2023-03-24','18:00','21:00','Maestría en Narrativa y Producción Audiovisual',4,'Disponible','R 42');
select create_servicios_dia('12814','1160','Sábado','2023-03-25','9:00','12:00','Maestría en Narrativa y Producción Audiovisual',4,'Disponible','R 46');
select create_servicios_dia('12813','1160','Viernes','2023-03-31','18:00','21:00','Maestría en Narrativa y Producción Audiovisual',4,'Disponible','R 42');
select create_servicios_dia('12813','1160','Viernes','2023-04-14','18:00','21:00','Maestría en Narrativa y Producción Audiovisual',4,'Disponible','R 42');
select create_servicios_dia('12813','1160','Viernes','2023-04-21','18:00','21:00','Maestría en Narrativa y Producción Audiovisual',4,'Disponible','R 42');
select create_servicios_dia('12814','1160','Sábado','2023-04-01','9:00','12:00','Maestría en Narrativa y Producción Audiovisual',4,'Disponible','R 46');
select create_servicios_dia('12814','1160','Sábado','2023-04-15','9:00','12:00','Maestría en Narrativa y Producción Audiovisual',4,'Disponible','R 46');
select create_servicios_dia('12814','1160','Sábado','2023-04-22','9:00','12:00','Maestría en Narrativa y Producción Audiovisual',4,'Disponible','R 46');


select create_servicios_dia('12784','1119','Jueves','2023-02-23','19:00','22:00','Maestría en Comunicación Institucional',5,'Disponible','NR 08');
select create_servicios_dia('12784','1119','Jueves','2023-02-02','19:00','22:00','Maestría en Comunicación Institucional',5,'Disponible','NR 08');
select create_servicios_dia('12784','1119','Jueves','2023-02-09','19:00','22:00','Maestría en Comunicación Institucional',5,'Disponible','NR 08');
select create_servicios_dia('12784','1119','Jueves','2023-02-16','19:00','22:00','Maestría en Comunicación Institucional',5,'Disponible','NR 08');

CREATE OR REPLACE FUNCTION create_servicios_dia (id_horario int, no_clase varchar, dia varchar, fecha date, hora_inicio time, hora_fin time, programa varchar, num_servicios int, estado varchar, salon varchar) RETURNS void AS $$
BEGIN
	INSERT INTO Servicios_dia VALUES(id_horario, no_clase, dia, fecha,hora_inicio,hora_fin, programa, num_servicios, estado, salon);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION travel_horario() RETURNS void AS $$
DECLARE
	horario record;
	clase_programa record;
	fecha_inicio date;
BEGIN
	/*recorrer horarios*/
	FOR horario IN SELECT * FROM Horario LOOP
		/*recorrer clase_programa*/
		fecha_inicio = horario.fecha_inicio;
		FOR clase_programa IN SELECT * FROM Clase_programa LOOP
			/*llamar funcion*/
			IF horario.no_clase = clase_programa.no_clase and clase_programa.num_alunos != 0 THEN
				IF EXTRACT(DOW FROM fecha_inicio) = 1 THEN
					IF horario.dia = 'Martes' THEN
						fecha_inicio = fecha_inicio + interval '1 day';
					ELSIF horario.dia = 'Miércoles' THEN
						fecha_inicio = fecha_inicio + interval '2 day';
					ELSIF horario.dia = 'Jueves' THEN
						fecha_inicio = fecha_inicio + interval '3 day';
					ELSIF horario.dia = 'Viernes' THEN 
						fecha_inicio = fecha_inicio + interval '4 day';
					ELSIF horario.dia = 'Sábado' THEN
						fecha_inicio = fecha_inicio + interval '5 day';
					END IF;
				ELSIF EXTRACT(DOW FROM fecha_inicio) =  2 THEN
					IF horario.dia = 'Lunes' THEN
						fecha_inicio = fecha_inicio + interval '6 day';
					ELSIF horario.dia = 'Miércoles' THEN
						fecha_inicio = fecha_inicio + interval '1 day';
					ELSIF horario.dia = 'Jueves' THEN
						fecha_inicio = fecha_inicio + interval '2 day';
					ELSIF horario.dia = 'Viernes' THEN
						fecha_inicio = fecha_inicio + interval '3 day';
					ELSIF horario.dia = 'Sábado' THEN
						fecha_inicio = fecha_inicio + interval '4 day';
					END IF;
				ELSIF EXTRACT(DOW FROM fecha_inicio) = 3 THEN
					IF horario.dia = 'Lunes' THEN
						fecha_inicio = fecha_inicio + interval '5 day';
					ELSIF horario.dia = 'Martes' THEN
						fecha_inicio = fecha_inicio + interval '6 day';
					ELSIF horario.dia = 'Jueves' THEN
						fecha_inicio = fecha_inicio + interval '1 day';
					ELSIF horario.dia = 'Viernes' THEN
						fecha_inicio = fecha_inicio + interval '2 day';
					ELSIF horario.dia = 'Sábado' THEN
						fecha_inicio =  fecha_inicio + interval '3 day';
					END IF;
				ELSIF EXTRACT(DOW FROM fecha_inicio) = 4 THEN
					IF horario.dia = 'Lunes' THEN
						fecha_inicio = fecha_inicio + interval '4 day';
					ELSIF horario.dia = 'Martes' THEN
						fecha_inicio = fecha_inicio + interval '5 day';
					ELSIF horario.dia = 'Miércoles' THEN
						fecha_inicio = fecha_inicio + interval '6 day';
					ELSIF horario.dia = 'Viernes' THEN
						fecha_inicio = fecha_inicio + interval '1 day';
					ELSIF horario.dia = 'Sábado' THEN
						fecha_inicio = fecha_inicio + interval '2 day';
					END IF;
				ELSIF EXTRACT(DOW FROM fecha_inicio) = 5 THEN
					IF horario.dia = 'Lunes'  THEN
						fecha_inicio = fecha_inicio + interval '3 day';
					ELSIF horario.dia = 'Martes' THEN
						fecha_inicio = fecha_inicio + interval '4 day';
					ELSIF horario.dia = 'Miércoles' THEN
						fecha_inicio = fecha_inicio + interval '5 day';
					ELSIF horario.dia = 'Jueves' THEN
						fecha_inicio = fecha_inicio + interval '6 day';
					ELSIF horario.dia = 'Sábado' THEN
						fecha_inicio = fecha_inicio + interval '1 day';
					END IF;
				ELSIF EXTRACT(DOW FROM fecha_inicio) = 6 THEN
					IF horario.dia = 'Lunes' THEN
						fecha_inicio = fecha_inicio + interval '2 day';
					ELSIF horario.dia = 'Martes' THEN
						fecha_inicio = fecha_inicio + interval '3 day';
					ELSIF horario.dia = 'Miércoles' THEN
						fecha_inicio = fecha_inicio + interval '4 day';
					ELSIF horario.dia = 'Jueves' THEN
						fecha_inicio = fecha_inicio + interval '5 day';
					ELSIF horario.dia = 'Viernes' THEN
						fecha_inicio = fecha_inicio + interval '6 day';
					END IF;
				END IF;
				WHILE fecha_inicio <= horario.fecha_fin LOOP
					INSERT INTO servicios_dia (no_clase,dia,fecha,hora_inicio,hora_fin,programa,num_servicios,salon) VALUES (clase_programa.no_clase,horario.dia,fecha_inicio,horario.hora_inicio,horario.hora_fin,clase_programa.programa,clase_programa.num_alunos,horario.salon);
					fecha_inicio = fecha_inicio + interval '7 day';
				END LOOP;
			END IF;
		END LOOP;
	END LOOP;
END;
$$ LANGUAGE plpgsql;


SELECT sd.no_clase,m.nombre_modulo,sd.dia,sd.fecha,sd.hora_inicio,sd.hora_fin,sd.programa,sd.num_servicios,sd.salon,p.escuela,s.isla,s.sede,e.cuenta
FROM servicios_dia as sd 
inner join programa as p ON p.programa = sd.programa
inner join salon as s on s.salon = sd.salon
inner join clase on sd.no_clase = clase.no_clase
inner join modulo as m on clase.id_curso = m.id_curso
inner join receso as r on sd.dia = r.dia and p.escuela = r.escuela
inner join escuela as e on p.escuela = e.escuela
where sd.hora_inicio < r.hora_inicio
where p.escuela = 'Gobierno y Economía';


SELECT sd.no_clase,m.nombre_modulo,sd.dia,sd.fecha,sd.hora_inicio,sd.hora_fin,sd.programa,sd.num_servicios,p.escuela
FROM servicios_dia as sd 
inner join programa as p ON p.programa = sd.programa
inner join clase on sd.no_clase = clase.no_clase
inner join modulo as m on clase.id_curso = m.id_curso
inner join receso as r on sd.dia = r.dia and p.escuela = r.escuela
where p.escuela = 'Ingeniería' and salon is NULL;

SELECT sd.no_clase,m.nombre_modulo,sd.dia,sd.fecha,sd.hora_inicio,sd.hora_fin,sd.programa,sd.num_servicios,sd.salon,p.escuela,s.isla,s.sede
FROM servicios_dia as sd 
inner join programa as p ON p.programa = sd.programa
inner join salon as s on s.salon = sd.salon
inner join clase on sd.no_clase = clase.no_clase
inner join modulo as m on clase.id_curso = m.id_curso
inner join receso as r on sd.dia = r.dia and p.escuela = r.escuela
where r.hora_fin > sd.hora_inicio and r.hora_fin < sd.hora_fin and p.escuela = 'Gobierno y Economía';


INSERT INTO Clase_programa values('SESI','Diplomado en Wellness');
INSERT INTO Clase_programa values('DIME','Diplomado en Wellness');
INSERT INTO Clase_programa values('DIMFI','Diplomado en Wellness');
INSERT INTO Clase_programa values('DIMAM','Diplomado en Wellness');
INSERT INTO Clase_programa values('DIMIN','Diplomado en Wellness');
INSERT INTO Clase_programa values('DIMESP','Diplomado en Wellness');
INSERT INTO Clase_programa values('DIMSOC','Diplomado en Wellness');
INSERT INTO Clase_programa values('DIMFIN','Diplomado en Wellness');
INSERT INTO Clase_programa values('DIMOC','Diplomado en Wellness');
INSERT INTO Clase_programa values('IWV','Diplomado en Wellness');

Maestría en Dirección de Instituciones de Salud	10951
Maestría en Dirección de Instituciones de Salud	10952
Maestría en Dirección de Instituciones de Salud	10954
Maestría en Dirección de Instituciones de Salud	10975
Especialidad en Gestión de Eventos	6654
Especialidad en Gestión de Eventos	6655
Especialidad en Gestión de Eventos	6656
Especialidad en Gestión de Eventos	6657
Especialidad en Gestión de Eventos	6650
Especialidad en Gestión de Eventos	1389
Especialidad en Gestión de Eventos	1390
Especialidad en Gestión de Eventos	1391
Especialidad en Gestión de Eventos	1392
Especialidad en Gestión de Eventos	1393
Especialidad en Emprendedores de Negocios de Alimentos y Bebidas	1379
Especialidad en Emprendedores de Negocios de Alimentos y Bebidas	1380
Especialidad en Emprendedores de Negocios de Alimentos y Bebidas	1381
Especialidad en Emprendedores de Negocios de Alimentos y Bebidas	1382
Especialidad en Emprendedores de Negocios de Alimentos y Bebidas	1383

INSERT INTO Clase_programa values ('10951','Maestría en Dirección de Instituciones de Salud');
INSERT INTO Clase_programa values ('10952','Maestría en Dirección de Instituciones de Salud');
INSERT INTO Clase_programa values ('10954','Maestría en Dirección de Instituciones de Salud');
INSERT INTO Clase_programa values ('10975','Maestría en Dirección de Instituciones de Salud');
INSERT INTO Clase_programa values ('6654','Especialidad en Gestión de Eventos');
INSERT INTO Clase_programa values ('6655','Especialidad en Gestión de Eventos');
INSERT INTO Clase_programa values ('6656','Especialidad en Gestión de Eventos');
INSERT INTO Clase_programa values ('6657','Especialidad en Gestión de Eventos');
INSERT INTO Clase_programa values ('6650','Especialidad en Gestión de Eventos');
INSERT INTO Clase_programa values ('1389','Especialidad en Gestión de Eventos');
INSERT INTO Clase_programa values ('1390','Especialidad en Gestión de Eventos');
INSERT INTO Clase_programa values ('1391','Especialidad en Gestión de Eventos');
INSERT INTO Clase_programa values ('1392','Especialidad en Gestión de Eventos');
INSERT INTO Clase_programa values ('1393','Especialidad en Gestión de Eventos');
INSERT INTO Clase_programa values ('1379','Especialidad en Emprendedores de Negocios de Alimentos y Bebidas');
INSERT INTO Clase_programa values ('1380','Especialidad en Emprendedores de Negocios de Alimentos y Bebidas');
INSERT INTO Clase_programa values ('1381','Especialidad en Emprendedores de Negocios de Alimentos y Bebidas');
INSERT INTO Clase_programa values ('1382','Especialidad en Emprendedores de Negocios de Alimentos y Bebidas');
INSERT INTO Clase_programa values ('1383','Especialidad en Emprendedores de Negocios de Alimentos y Bebidas');






insert into servicios_dia (id_horario,no_clase,dia,fecha,hora_inicio,hora_fin,programa,num_servicios,estado,salon) values ('13937','1194','Jueves','2023-01-12','16:00','20:00','Maestría en Neuropsicología y Educación','30','Disponible','R 05');




SELECT sd.no_clase,m.nombre_modulo,sd.dia,sd.fecha,sd.hora_inicio,sd.hora_fin,sd.programa,sd.num_servicios,sd.salon,p.escuela,s.isla,s.sede
FROM servicios_dia as sd 
inner join programa as p ON p.programa = sd.programa
inner join salon as s on s.salon = sd.salon
inner join clase on sd.no_clase = clase.no_clase
inner join modulo as m on clase.id_curso = m.id_curso
inner join receso as r on sd.dia = r.dia and p.escuela = r.escuela
where id_horario = '13937' or id_horario = '12331';

CREATE OR REPLACE FUNCTION travel_single_horario(id_horario_a int, programa text, num_alumnos int) RETURNS VOID AS $$
DECLARE
	horario_r record;
	fecha_inicio date;
BEGIN
	SELECT * FROM horario WHERE horario.id_horario = id_horario_a INTO horario_r;
	fecha_inicio = horario_r.fecha_inicio;
	IF EXTRACT(DOW FROM fecha_inicio) = 1 THEN
		IF horario_r.dia = 'Martes' THEN
			fecha_inicio = fecha_inicio + interval '1 day';
		ELSIF horario_r.dia = 'Miércoles' THEN
			fecha_inicio = fecha_inicio + interval '2 day';
		ELSIF horario_r.dia = 'Jueves' THEN
			fecha_inicio = fecha_inicio + interval '3 day';
		ELSIF horario_r.dia = 'Viernes' THEN 
			fecha_inicio = fecha_inicio + interval '4 day';
		ELSIF horario_r.dia = 'Sábado' THEN
			fecha_inicio = fecha_inicio + interval '5 day';
		END IF;
	ELSIF EXTRACT(DOW FROM fecha_inicio) =  2 THEN
		IF horario_r.dia = 'Lunes' THEN
			fecha_inicio = fecha_inicio + interval '6 day';
		ELSIF horario_r.dia = 'Miércoles' THEN
			fecha_inicio = fecha_inicio + interval '1 day';
		ELSIF horario_r.dia = 'Jueves' THEN
			fecha_inicio = fecha_inicio + interval '2 day';
		ELSIF horario_r.dia = 'Viernes' THEN
			fecha_inicio = fecha_inicio + interval '3 day';
		ELSIF horario_r.dia = 'Sábado' THEN
			fecha_inicio = fecha_inicio + interval '4 day';
		END IF;
	ELSIF EXTRACT(DOW FROM fecha_inicio) = 3 THEN
		IF horario_r.dia = 'Lunes' THEN
			fecha_inicio = fecha_inicio + interval '5 day';
		ELSIF horario_r.dia = 'Martes' THEN
			fecha_inicio = fecha_inicio + interval '6 day';
		ELSIF horario_r.dia = 'Jueves' THEN
			fecha_inicio = fecha_inicio + interval '1 day';
		ELSIF horario_r.dia = 'Viernes' THEN
			fecha_inicio = fecha_inicio + interval '2 day';
		ELSIF horario_r.dia = 'Sábado' THEN
			fecha_inicio =  fecha_inicio + interval '3 day';
		END IF;
	ELSIF EXTRACT(DOW FROM fecha_inicio) = 4 THEN
		IF horario_r.dia = 'Lunes' THEN
			fecha_inicio = fecha_inicio + interval '4 day';
		ELSIF horario_r.dia = 'Martes' THEN
			fecha_inicio = fecha_inicio + interval '5 day';
		ELSIF horario_r.dia = 'Miércoles' THEN
			fecha_inicio = fecha_inicio + interval '6 day';
		ELSIF horario_r.dia = 'Viernes' THEN
			fecha_inicio = fecha_inicio + interval '1 day';
		ELSIF horario_r.dia = 'Sábado' THEN
			fecha_inicio = fecha_inicio + interval '2 day';
		END IF;
	ELSIF EXTRACT(DOW FROM fecha_inicio) = 5 THEN
		IF horario_r.dia = 'Lunes'  THEN
			fecha_inicio = fecha_inicio + interval '3 day';
		ELSIF horario_r.dia = 'Martes' THEN
			fecha_inicio = fecha_inicio + interval '4 day';
		ELSIF horario_r.dia = 'Miércoles' THEN
			fecha_inicio = fecha_inicio + interval '5 day';
		ELSIF horario_r.dia = 'Jueves' THEN
			fecha_inicio = fecha_inicio + interval '6 day';
		ELSIF horario_r.dia = 'Sábado' THEN
			fecha_inicio = fecha_inicio + interval '1 day';
		END IF;
	ELSIF EXTRACT(DOW FROM fecha_inicio) = 6 THEN
		IF horario_r.dia = 'Lunes' THEN
			fecha_inicio = fecha_inicio + interval '2 day';
		ELSIF horario_r.dia = 'Martes' THEN
			fecha_inicio = fecha_inicio + interval '3 day';
		ELSIF horario_r.dia = 'Miércoles' THEN
			fecha_inicio = fecha_inicio + interval '4 day';
		ELSIF horario_r.dia = 'Jueves' THEN
			fecha_inicio = fecha_inicio + interval '5 day';
		ELSIF horario_r.dia = 'Viernes' THEN
			fecha_inicio = fecha_inicio + interval '6 day';
		END IF;
	END IF;
	WHILE fecha_inicio <= horario_r.fecha_fin LOOP
		PERFORM create_servicios_dia(horario_r.id_horario, horario_r.no_clase, horario_r.dia, fecha_inicio, horario_r.hora_inicio, horario_r.hora_fin, programa, num_alumnos,'Disponible', horario_r.salon);
		fecha_inicio = fecha_inicio + interval '7 day';
	END LOOP; 
END;
$$ LANGUAGE plpgsql;


insert into horario (no_clase, dia, fecha_inicio, fecha_fin, hora_inicio, hora_fin, salon) values ('1427','Lunes','2023-01-10','2023-01-18','19:00','22:00','NR 03');
insert into horario (no_clase, dia, fecha_inicio, fecha_fin, hora_inicio, hora_fin, salon) values ('1427','Miércoles','2023-01-10','2023-01-18','19:00','22:00','NR 03');
insert into horario (no_clase, dia, fecha_inicio, fecha_fin, hora_inicio, hora_fin, salon) values ('1427','Martes','2023-01-10','2023-01-18','19:00','22:00','NR 03');
insert into horario (no_clase, dia, fecha_inicio, fecha_fin, hora_inicio, hora_fin, salon) values ('1427','Martes','2023-01-10','2023-01-18','19:00','22:00','NR 03');
insert into horario (no_clase, dia, fecha_inicio, fecha_fin, hora_inicio, hora_fin, salon) values ('1427','Jueves','2023-01-19','2023-01-19','19:00','22:00','NR 32');

select travel_single_horario('13939','Maestría en Derecho Fiscal',20);
select travel_single_horario('13940','Maestría en Derecho Fiscal',20);
select travel_single_horario('13941','Maestría en Derecho Fiscal',20);
select travel_single_horario('13942','Maestría en Derecho Fiscal',20);
select travel_single_horario('13944','Maestría en Derecho Fiscal',20);




select create_servicios_dia('12241','1574','Lunes','2023-02-27','19:00','22:00','Maestría en Historia del Pensamiento',16,'Disponible','SF_6-1');


insert into horario (no_clase, dia, fecha_inicio, fecha_fin, hora_inicio, hora_fin, salon) values ('1318','Viernes','2023-06-13','2023-01-28','18:00','21:00','R 14');
insert into horario (no_clase, dia, fecha_inicio, fecha_fin, hora_inicio, hora_fin, salon) values ('1096','Sábado','2023-01-13','2023-01-28','9:00','12:00','R 14');





CREATE OR REPLACE FUNCTION log_servicios_dia_for_each_horario() RETURNS TRIGGER AS $$
DECLARE
	fecha_inicio date;
	clase_programa_record record;
BEGIN
	fecha_inicio = NEW.fecha_inicio;
	FOR clase_programa_record IN SELECT * FROM clase_programa where no_clase = NEW.no_clase LOOP
		IF EXTRACT(DOW FROM fecha_inicio) = 1 THEN
			IF NEW.dia = 'Martes' THEN
				fecha_inicio = fecha_inicio + interval '1 day';
			ELSIF NEW.dia = 'Miércoles' THEN
				fecha_inicio = fecha_inicio + interval '2 day';
			ELSIF NEW.dia = 'Jueves' THEN
				fecha_inicio = fecha_inicio + interval '3 day';
			ELSIF NEW.dia = 'Viernes' THEN 
				fecha_inicio = fecha_inicio + interval '4 day';
			ELSIF NEW.dia = 'Sábado' THEN
				fecha_inicio = fecha_inicio + interval '5 day';
			END IF;
		ELSIF EXTRACT(DOW FROM fecha_inicio) =  2 THEN
			IF NEW.dia = 'Lunes' THEN
				fecha_inicio = fecha_inicio + interval '6 day';
			ELSIF NEW.dia = 'Miércoles' THEN
				fecha_inicio = fecha_inicio + interval '1 day';
			ELSIF NEW.dia = 'Jueves' THEN
				fecha_inicio = fecha_inicio + interval '2 day';
			ELSIF NEW.dia = 'Viernes' THEN
				fecha_inicio = fecha_inicio + interval '3 day';
			ELSIF NEW.dia = 'Sábado' THEN
				fecha_inicio = fecha_inicio + interval '4 day';
			END IF;
		ELSIF EXTRACT(DOW FROM fecha_inicio) = 3 THEN
			IF NEW.dia = 'Lunes' THEN
				fecha_inicio = fecha_inicio + interval '5 day';
			ELSIF NEW.dia = 'Martes' THEN
				fecha_inicio = fecha_inicio + interval '6 day';
			ELSIF NEW.dia = 'Jueves' THEN
				fecha_inicio = fecha_inicio + interval '1 day';
			ELSIF NEW.dia = 'Viernes' THEN
				fecha_inicio = fecha_inicio + interval '2 day';
			ELSIF NEW.dia = 'Sábado' THEN
				fecha_inicio =  fecha_inicio + interval '3 day';
			END IF;
		ELSIF EXTRACT(DOW FROM fecha_inicio) = 4 THEN
			IF NEW.dia = 'Lunes' THEN
				fecha_inicio = fecha_inicio + interval '4 day';
			ELSIF NEW.dia = 'Martes' THEN
				fecha_inicio = fecha_inicio + interval '5 day';
			ELSIF NEW.dia = 'Miércoles' THEN
				fecha_inicio = fecha_inicio + interval '6 day';
			ELSIF NEW.dia = 'Viernes' THEN
				fecha_inicio = fecha_inicio + interval '1 day';
			ELSIF NEW.dia = 'Sábado' THEN
				fecha_inicio = fecha_inicio + interval '2 day';
			END IF;
		ELSIF EXTRACT(DOW FROM fecha_inicio) = 5 THEN
			IF NEW.dia = 'Lunes'  THEN
				fecha_inicio = fecha_inicio + interval '3 day';
			ELSIF NEW.dia = 'Martes' THEN
				fecha_inicio = fecha_inicio + interval '4 day';
			ELSIF NEW.dia = 'Miércoles' THEN
				fecha_inicio = fecha_inicio + interval '5 day';
			ELSIF NEW.dia = 'Jueves' THEN
				fecha_inicio = fecha_inicio + interval '6 day';
			ELSIF NEW.dia = 'Sábado' THEN
				fecha_inicio = fecha_inicio + interval '1 day';
			END IF;
		ELSIF EXTRACT(DOW FROM fecha_inicio) = 6 THEN
			IF NEW.dia = 'Lunes' THEN
				fecha_inicio = fecha_inicio + interval '2 day';
			ELSIF NEW.dia = 'Martes' THEN
				fecha_inicio = fecha_inicio + interval '3 day';
			ELSIF NEW.dia = 'Miércoles' THEN
				fecha_inicio = fecha_inicio + interval '4 day';
			ELSIF NEW.dia = 'Jueves' THEN
				fecha_inicio = fecha_inicio + interval '5 day';
			ELSIF NEW.dia = 'Viernes' THEN
				fecha_inicio = fecha_inicio + interval '6 day';
			END IF;
		END IF;
		WHILE fecha_inicio <= NEW.fecha_fin LOOP
			PERFORM create_servicios_dia(NEW.id_horario, NEW.no_clase, NEW.dia, fecha_inicio, NEW.hora_inicio, NEW.hora_fin, clase_programa_record.programa , clase_programa_record.num_alunos ,'Disponible', NEW.salon);
			fecha_inicio = fecha_inicio + interval '7 day';
		END LOOP;
	END LOOP;
END;
$$ LANGUAGE plpgsql;





CREATE FUNCTION update_servicios_dia() 
RETURNS TRIGGER
AS $$

DECLARE
	fecha_inicio date;
	clase_programa_record record;
	num_alumnos int;
BEGIN
	DELETE FROM servicios_dia where id_horario = NEW.id_horario;
	fecha_inicio = NEW.fecha_inicio;
	FOR clase_programa_record IN SELECT DISTINCT no_clase,programa FROM clase_programa where no_clase = NEW.no_clase LOOP
		SELECT num_alunos FROM clase_programa inner join programa on programa.programa = clase_programa.programa where no_clase = clase_programa_record.no_clase and clase_programa.programa = clase_programa_record.programa and programa.escuela = NEW.escuela into num_alumnos;
		IF num_alumnos != 0 THEN
			IF EXTRACT(DOW FROM fecha_inicio) = 1 THEN
				IF NEW.dia = 'Martes' THEN
					fecha_inicio = fecha_inicio + interval '1 day';
				ELSIF NEW.dia = 'Miércoles' THEN
					fecha_inicio = fecha_inicio + interval '2 day';
				ELSIF NEW.dia = 'Jueves' THEN
					fecha_inicio = fecha_inicio + interval '3 day';
				ELSIF NEW.dia = 'Viernes' THEN 
					fecha_inicio = fecha_inicio + interval '4 day';
				ELSIF NEW.dia = 'Sábado' THEN
					fecha_inicio = fecha_inicio + interval '5 day';
				END IF;
			ELSIF EXTRACT(DOW FROM fecha_inicio) =  2 THEN
				IF NEW.dia = 'Lunes' THEN
					fecha_inicio = fecha_inicio + interval '6 day';
				ELSIF NEW.dia = 'Miércoles' THEN
					fecha_inicio = fecha_inicio + interval '1 day';
				ELSIF NEW.dia = 'Jueves' THEN
					fecha_inicio = fecha_inicio + interval '2 day';
				ELSIF NEW.dia = 'Viernes' THEN
					fecha_inicio = fecha_inicio + interval '3 day';
				ELSIF NEW.dia = 'Sábado' THEN
					fecha_inicio = fecha_inicio + interval '4 day';
				END IF;
			ELSIF EXTRACT(DOW FROM fecha_inicio) = 3 THEN
				IF NEW.dia = 'Lunes' THEN
					fecha_inicio = fecha_inicio + interval '5 day';
				ELSIF NEW.dia = 'Martes' THEN
					fecha_inicio = fecha_inicio + interval '6 day';
				ELSIF NEW.dia = 'Jueves' THEN
					fecha_inicio = fecha_inicio + interval '1 day';
				ELSIF NEW.dia = 'Viernes' THEN
					fecha_inicio = fecha_inicio + interval '2 day';
				ELSIF NEW.dia = 'Sábado' THEN
					fecha_inicio =  fecha_inicio + interval '3 day';
				END IF;
			ELSIF EXTRACT(DOW FROM fecha_inicio) = 4 THEN
				IF NEW.dia = 'Lunes' THEN
					fecha_inicio = fecha_inicio + interval '4 day';
				ELSIF NEW.dia = 'Martes' THEN
					fecha_inicio = fecha_inicio + interval '5 day';
				ELSIF NEW.dia = 'Miércoles' THEN
					fecha_inicio = fecha_inicio + interval '6 day';
				ELSIF NEW.dia = 'Viernes' THEN
					fecha_inicio = fecha_inicio + interval '1 day';
				ELSIF NEW.dia = 'Sábado' THEN
					fecha_inicio = fecha_inicio + interval '2 day';
				END IF;
			ELSIF EXTRACT(DOW FROM fecha_inicio) = 5 THEN
				IF NEW.dia = 'Lunes'  THEN
					fecha_inicio = fecha_inicio + interval '3 day';
				ELSIF NEW.dia = 'Martes' THEN
					fecha_inicio = fecha_inicio + interval '4 day';
				ELSIF NEW.dia = 'Miércoles' THEN
					fecha_inicio = fecha_inicio + interval '5 day';
				ELSIF NEW.dia = 'Jueves' THEN
					fecha_inicio = fecha_inicio + interval '6 day';
				ELSIF NEW.dia = 'Sábado' THEN
					fecha_inicio = fecha_inicio + interval '1 day';
				END IF;
			ELSIF EXTRACT(DOW FROM fecha_inicio) = 6 THEN
				IF NEW.dia = 'Lunes' THEN
					fecha_inicio = fecha_inicio + interval '2 day';
				ELSIF NEW.dia = 'Martes' THEN
					fecha_inicio = fecha_inicio + interval '3 day';
				ELSIF NEW.dia = 'Miércoles' THEN
					fecha_inicio = fecha_inicio + interval '4 day';
				ELSIF NEW.dia = 'Jueves' THEN
					fecha_inicio = fecha_inicio + interval '5 day';
				ELSIF NEW.dia = 'Viernes' THEN
					fecha_inicio = fecha_inicio + interval '6 day';
				END IF;
			END IF;
			WHILE fecha_inicio <= NEW.fecha_fin LOOP
				PERFORM create_servicios_dia(NEW.id_horario, NEW.no_clase, NEW.dia, fecha_inicio, NEW.hora_inicio, NEW.hora_fin, clase_programa_record.programa , num_alumnos ,'Disponible', NEW.salon);
				fecha_inicio = fecha_inicio + interval '7 day';
			END LOOP;
		END IF;
	END LOOP;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_servicios_dia_on_horario_update 
   AFTER UPDATE
   ON horario
   FOR EACH ROW
       EXECUTE PROCEDURE update_servicios_dia();


CREATE FUNCTION get_servicios_semana()
RETURNS VOID
AS $$
DECLARE
	fecha_inicio date;
	fecha_fin date;
BEGIN
	fecha_inicio = date_trunc('week', now());
	fecha_fin = fecha_inicio + interval '6 day';
	SELECT sd.no_clase,m.nombre_modulo,sd.dia,sd.fecha,sd.hora_inicio,sd.hora_fin,sd.programa,sd.num_servicios,sd.salon,p.escuela,s.isla,s.sede,p.cuenta
	FROM servicios_dia as sd 
	inner join programa as p ON p.programa = sd.programa
	inner join salon as s on s.salon = sd.salon
	inner join clase on sd.no_clase = clase.no_clase
	inner join modulo as m on clase.id_curso = m.id_curso
	inner join receso as r on sd.dia = r.dia and p.escuela = r.escuela
	inner join escuela as e on p.escuela = e.escuela
	where sd.hora_inicio < r.hora_inicio
	where sd.fecha >= fecha_inicio and sd.fecha <= fecha_fin;
END;
$$ LANGUAGE plpgsql;
/*perfom function*/
