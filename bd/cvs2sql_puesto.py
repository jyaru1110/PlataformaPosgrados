import pandas as pd

# Read the csv file
df = pd.read_csv('puesto.csv')
#open sql file to write
f = open('puesto.sql', 'w')
for index, row in df.iterrows():
     f.write("INSERT INTO Puesto_programa (programa, email_persona, puesto) VALUES ('"+row['Programa']+"', '"+row['Correo']+"', '"+row['Puesto']+"');\n")