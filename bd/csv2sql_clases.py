import pandas as pd

# Read the csv file
df = pd.read_csv('clases.csv')
#open sql file to write
f = open('clases.sql', 'w')
for index, row in df.iterrows():
    #fecha_inicio = row['Fecha de inicio del módulo'][6:] + '/' + row['Fecha de inicio del módulo'][3:5] + '/' + row['Fecha de inicio del módulo'][:2]
    #fecha_fin = row['Fecha de fin del módulo'][6:] + '/' + row['Fecha de fin del módulo'][3:5] + '/' + row['Fecha de fin del módulo'][:2]

    f.write("INSERT INTO Clase (no_clase, id_curso) VALUES ('"+str(row['No. de clase'])+"', '"+str(row['Id de curso']).zfill(6)+"');\n")