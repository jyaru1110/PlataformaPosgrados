import pandas as pd

# Read the csv file
df = pd.read_csv('cuentas.csv')

#open sql file to write
f = open('cuentas.sql', 'w')

for index, row in df.iterrows():
    f.write("UPDATE Programa SET cuenta='"+str(row['No. de cuenta'])+"' where programa = '"+str(row['Programa'])+"';\n")