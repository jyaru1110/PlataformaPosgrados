import pandas as pd
import math
# Read the csv file
df = pd.read_csv('horarios.csv')
#open sql file to write
f = open('horarios.sql', 'w')
for index, row in df.iterrows():
    #math.isnan
    fecha_ini = row['Fecha de inicio del módulo'][6:]+"-"+row['Fecha de inicio del módulo'][3:5]+"-"+row['Fecha de inicio del módulo'][0:2]
    fecha_fin = row['Fecha de fin del módulo'][6:]+"-"+row['Fecha de fin del módulo'][3:5]+"-"+row['Fecha de fin del módulo'][0:2]
    if(type(row['salon'])!=str):
        if(row['Lu']=='Y'):
            f.write("INSERT INTO Horario (fecha_inicio, fecha_fin, no_clase, dia,hora_inicio,hora_fin) VALUES ('"+fecha_ini+"','"+fecha_fin+"','"+str(int(row['No. de clase']))+"','Lunes','"+row['Hora de inicio']+"','"+row['Hora de fin']+"');\n")
        if(row['Ma']=='Y'):
            f.write("INSERT INTO Horario (fecha_inicio, fecha_fin, no_clase, dia,hora_inicio,hora_fin) VALUES ('"+fecha_ini+"','"+fecha_fin+"','"+str(int(row['No. de clase']))+"','Martes','"+row['Hora de inicio']+"','"+row['Hora de fin']+"');\n")
        if(row['Mi']=='Y'):
            f.write("INSERT INTO Horario (fecha_inicio, fecha_fin, no_clase, dia,hora_inicio,hora_fin) VALUES ('"+fecha_ini+"','"+fecha_fin+"','"+str(int(row['No. de clase']))+"','Miercoles','"+row['Hora de inicio']+"','"+row['Hora de fin']+"');\n")
        if(row['Ju']=='Y'):
            f.write("INSERT INTO Horario (fecha_inicio, fecha_fin, no_clase, dia,hora_inicio,hora_fin) VALUES ('"+fecha_ini+"','"+fecha_fin+"','"+str(int(row['No. de clase']))+"','Jueves','"+row['Hora de inicio']+"','"+row['Hora de fin']+"');\n")
        if(row['Vi']=='Y'):
            f.write("INSERT INTO Horario (fecha_inicio, fecha_fin, no_clase, dia,hora_inicio,hora_fin) VALUES ('"+fecha_ini+"','"+fecha_fin+"','"+str(int(row['No. de clase']))+"','Viernes','"+row['Hora de inicio']+"','"+row['Hora de fin']+"');\n")
        if(row['Sa']=='Y'):
            f.write("INSERT INTO Horario (fecha_inicio, fecha_fin, no_clase, dia,hora_inicio,hora_fin) VALUES ('"+fecha_ini+"','"+fecha_fin+"','"+str(int(row['No. de clase']))+"','Sábado','"+row['Hora de inicio']+"','"+row['Hora de fin']+"');\n")
    else:
        if(row['Lu']=='Y'):
            f.write("INSERT INTO Horario (fecha_inicio, fecha_fin, no_clase, dia,hora_inicio,hora_fin,salon) VALUES ('"+fecha_ini+"','"+fecha_fin+"','"+str(int(row['No. de clase']))+"','Lunes','"+row['Hora de inicio']+"','"+row['Hora de fin']+"','"+row['salon']+"');\n")
        if(row['Ma']=='Y'):
            f.write("INSERT INTO Horario (fecha_inicio, fecha_fin, no_clase, dia,hora_inicio,hora_fin,salon) VALUES ('"+fecha_ini+"','"+fecha_fin+"','"+str(int(row['No. de clase']))+"','Martes','"+row['Hora de inicio']+"','"+row['Hora de fin']+"','"+row['salon']+"');\n")
        if(row['Mi']=='Y'):
            f.write("INSERT INTO Horario (fecha_inicio, fecha_fin, no_clase, dia,hora_inicio,hora_fin,salon) VALUES ('"+fecha_ini+"','"+fecha_fin+"','"+str(int(row['No. de clase']))+"','Miercoles','"+row['Hora de inicio']+"','"+row['Hora de fin']+"','"+row['salon']+"');\n")
        if(row['Ju']=='Y'):
            f.write("INSERT INTO Horario (fecha_inicio, fecha_fin, no_clase, dia,hora_inicio,hora_fin,salon) VALUES ('"+fecha_ini+"','"+fecha_fin+"','"+str(int(row['No. de clase']))+"','Jueves','"+row['Hora de inicio']+"','"+row['Hora de fin']+"','"+row['salon']+"');\n")
        if(row['Vi']=='Y'):
            f.write("INSERT INTO Horario (fecha_inicio, fecha_fin, no_clase, dia,hora_inicio,hora_fin,salon) VALUES ('"+fecha_ini+"','"+fecha_fin+"','"+str(int(row['No. de clase']))+"','Viernes','"+row['Hora de inicio']+"','"+row['Hora de fin']+"','"+row['salon']+"');\n")
        if(row['Sa']=='Y'):
            f.write("INSERT INTO Horario (fecha_inicio, fecha_fin, no_clase, dia,hora_inicio,hora_fin,salon) VALUES ('"+fecha_ini+"','"+fecha_fin+"','"+str(int(row['No. de clase']))+"','Sábado','"+row['Hora de inicio']+"','"+row['Hora de fin']+"','"+row['salon']+"');\n")
    