import pandas as pd

# Read the csv file
df = pd.read_csv('clase_programa_empresariales.csv')

#open sql file to write
f = open('clase_programa_empresariales.sql', 'w')

for index, row in df.iterrows():
        f.write("INSERT INTO Clase_programa (programa, no_clase,num_alunos) VALUES ('"+row['programa']+"', '"+str(row['no_clase'])+"',"+str(int(row['no_alumnos']))+");\n")