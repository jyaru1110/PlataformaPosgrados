import pandas as pd
import math

#read de csv file
df = pd.read_csv('horario_extra_comunicacion.csv')
escuela = 'Comunicación'

#open a sql file
f = open('horarios_comunicacion.sql', 'w')

for index, row in df.iterrows():
    if(type(row['salon']) == str):
        if(type(row['no_clase'])==str):
            f.write("INSERT INTO HORARIO(salon,fecha_inicio,fecha_fin,no_clase,dia,hora_inicio,hora_fin,escuela) VALUES('"+row['salon']+"','"+row['fecha_inicio']+"','"+row['fecha_fin']+"','"+row['no_clase']+"','"+row['dia']+"','"+row['hora_inicio']+"','"+row['hora_fin']+"','"+escuela+"');\n")
        else:    
            f.write("INSERT INTO HORARIO(salon,fecha_inicio,fecha_fin,no_clase,dia,hora_inicio,hora_fin,escuela) VALUES('"+row['salon']+"','"+row['fecha_inicio']+"','"+row['fecha_fin']+"','"+str(int(row['no_clase']))+"','"+row['dia']+"','"+row['hora_inicio']+"','"+row['hora_fin']+"','"+escuela+"');\n")
    else:
        if(type(row['no_clase'])==str):
            f.write("INSERT INTO HORARIO(fecha_inicio,fecha_fin,no_clase,dia,hora_inicio,hora_fin,escuela) VALUES('"+row['fecha_inicio']+"','"+row['fecha_fin']+"','"+row['no_clase']+"','"+row['dia']+"','"+row['hora_inicio']+"','"+row['hora_fin']+"','"+escuela+"');\n")
        else:
            f.write("INSERT INTO HORARIO(fecha_inicio,fecha_fin,no_clase,dia,hora_inicio,hora_fin,escuela) VALUES('"+row['fecha_inicio']+"','"+row['fecha_fin']+"','"+str(int(row['no_clase']))+"','"+row['dia']+"','"+row['hora_inicio']+"','"+row['hora_fin']+"','"+escuela+"');\n")
