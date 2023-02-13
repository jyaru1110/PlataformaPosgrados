import datetime
import time
import pandas as pd

# read csv file
df = pd.read_csv('horarios.csv')

#open file
f = open('fechas.sql', 'w')

for index, row in df.iterrows():
    fecha_inicio = datetime.datetime.strptime(row['Fecha de inicio del módulo'], '%d/%m/%Y')
    fecha_fin = datetime.datetime.strptime(row['Fecha de fin del módulo'], '%d/%m/%Y')

    while fecha_inicio <= fecha_fin:
        f.write("INSERT INTO Fecha (fechas, no_clase) VALUES ('"+fecha_inicio.strftime('%Y-%m-%d')+"', '"+str(row['No. de clase'])+"');\n")
        fecha_inicio += datetime.timedelta(days=1)


