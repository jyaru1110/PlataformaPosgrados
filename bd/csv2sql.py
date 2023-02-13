import pandas as pd
import math

# Read the csv file
df = pd.read_csv('data.csv')
#open sql file to write
f = open('data.sql', 'a')

#recorre el dataframe e imprime cada fila
for index, row in df.iterrows():
    #write the sql insert statement
    #print(type(row['Cumpleaños']), row['Cumpleaños'])
    #print(type(row['Cumpleaños'])==str)
    if(math.isnan(row['ext']) != True and  type(row['Cumpleaños'])==str):
       # f.write("INSERT INTO Personas (email_persona, nombre, ext,birthday) VALUES ('"+row['Correo']+"', '"+row['Nombre']+"', '"+str(int(row['ext']))+"', '"+str(row['Cumpleaños'])+"');\n")
        pass
    elif(math.isnan(row['ext']) != True and type(row['Cumpleaños'])!=str):
        pass
        #f.write("INSERT INTO Personas (email_persona, nombre, ext) VALUES ('"+row['Correo']+"', '"+row['Nombre']+"', '"+str(row['ext'])+"');\n")
    elif(math.isnan(row['ext']) == True and type(row['Cumpleaños'])==str):
        pass
        #f.write("INSERT INTO Personas (email_persona, nombre, birthday) VALUES ('"+row['Correo']+"', '"+row['Nombre']+"', '"+str(row['Cumpleaños'])+"');\n")
    else:
        f.write("INSERT INTO Personas (email_persona, nombre) VALUES ('"+row['Correo']+"', '"+row['Nombre']+"');\n")
