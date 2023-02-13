import pandas as pd

# Read the csv file
df = pd.read_csv('clase_programa.csv')

#open sql file to write
f = open('clase_programa.sql', 'w')

for index, row in df.iterrows():
        f.write("INSERT INTO Clase_programa (programa, no_clase) VALUES ('"+row['Descripción del programa']+"', '"+str(int(row['No. de clase']))+"');\n")