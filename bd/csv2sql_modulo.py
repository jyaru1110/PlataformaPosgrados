import pandas

# Read the csv file
df = pandas.read_csv('modulos.csv')
#open sql file to write
f = open('modulos.sql', 'w')
for index, row in df.iterrows():
    f.write("INSERT INTO Modulo (id_curso, nombre_modulo) VALUES ('"+str(row['Id de curso']).zfill(6)+"','"+row['Nombre del módulo']+"');\n")
