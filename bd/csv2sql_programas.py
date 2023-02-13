import pandas as pd
import math

# Read the csv file
df = pd.read_csv('programas.csv')
#open sql file to write
f = open('programas.sql', 'w')
for index, row in df.iterrows():
     f.write("INSERT INTO Programa (programa, grado, tipo,codigo,escuela) VALUES ('"+row['Programa']+"', '"+row['Grado']+"', '"+row['Tipo']+"', '"+row['Código']+"','"+row['Escuela']+"');\n")