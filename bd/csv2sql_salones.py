import pandas as pd

# Read the csv file
df = pd.read_csv('salones.csv')
#open sql file to write
f = open('salones.sql', 'w')
for index, row in df.iterrows():
    f.write("INSERT INTO Salon (salon, isla, sede) VALUES ('"+row['salon']+"', '"+row['isla']+"', '"+row['sede']+"');\n")