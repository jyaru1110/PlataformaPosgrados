import pandas as pd

id_curso = 1
# Read the csv file
df = pd.read_csv('sin_clase.csv')

f = open('sin_clase.sql', 'w')

for index, row in df.iterrows():
    #f.write("DELETE FROM MODULO where id_curso = '"+row['nombre_modulo'][-3:]+str(id_curso)+"';\n")
    #f.write("insert into  MODULO  values('"+row['nombre_modulo'][-3:]+str(id_curso)+"','"+row['nombre_modulo']+"');\n")
    #f.write("INSERT INTO CLASE VALUES('"+str(int(row['no_clase']))+"','"+row['nombre_modulo'][-3:]+str(id_curso)+"');\n")
    #f.write("INSERT INTO CLASE_PROGRAMA VALUES('"+str(int(row['no_clase']))+"','"+row['programa']+"');\n")
    f.write("UPDATE Clase_programa SET num_alunos= "+str(row['no_alumnos'])+" where no_clase = '"+str(int(str(row['no_clase'])))+"' and programa = '"+row['programa']+"';\n")
    id_curso += 1
    #f.write("DELETE FROM Clase where no_clase = '"+str(int(str(row['no_clase'])))+"';\n")
    #f.write("DELETE FROM Clase_programa where no_clase = '"+str(int(str(row['no_clase'])))+"';\n")