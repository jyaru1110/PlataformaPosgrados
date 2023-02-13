import pandas as pd

# Read the csv filejhjdhjkashdkfjklfjlksdjfasdjfljasdfjasdjflasdjfjsdñafjasdflkdasjñfljasdklñfjsd
df = pd.read_csv('puesto_escuela.csv')
#open sql file to write
f = open('puesto_escuela.sql', 'w')
for index, row in df.iterrows():
     f.write("INSERT INTO Puesto_escuela (escuela, email_persona, puesto) VALUES ('"+row['Escuela']+"', '"+row['Correo']+"', '"+row['Puesto']+"');\n")