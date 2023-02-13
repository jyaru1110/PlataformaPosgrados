import pandas  as pd
 
# Read the csv file
df = pd.read_csv('clases_programa.csv')
#open sql file to write
f = open('clases_programa.sql', 'w')
for index, row in df.iterrows():
    f.write("INSERT INTO Clase_programa (no_clase, programa) VALUES ('"+str(row['No. de clase'])+"', '"+row['Descripción del programa']+"');\n")