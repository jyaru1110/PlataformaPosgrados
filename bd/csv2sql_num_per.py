import pandas as pd

# Read the csv files
df = pd.read_csv('clase_programa_ingenieria.csv')

f = open('num_personas_ing.sql', 'w')

for index, row in df.iterrows():
    f.write("UPDATE Clase_programa SET num_alunos="+str(row['no_alumnos'])+" where no_clase = '"+str(row['no_clase'])+"' and programa = '"+row['programa']+"';\n")