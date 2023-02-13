import pandas as pd 

# Read the csv file
df = pd.read_csv('derecho_per.csv')

f = open('peda_per.sql', 'w')

for index, row in df.iterrows():
    f.write("UPDATE Clase_programa SET num_alunos="+str(row['no_alumnos'])+" where no_clase = '"+str(row['no_clase'])+"' and programa = '"+row['programa']+"';\n")