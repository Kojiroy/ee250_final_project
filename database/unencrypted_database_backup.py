'''
A Python file that creates an unencrypted backup of a MySQL database.
'''

import mysql.connector as m # needs mysql-connector-python
from datetime import datetime
import config

cur_date = datetime.now()
cur_date = cur_date.strftime("%m_%d_%Y")
backup_db_name = config.database + f"_backup_{cur_date}"

connection = m.connect(host=config.host, user=config.user, password=config.password, database=config.database)
cursor = connection.cursor()

cursor.execute("SHOW TABLES;")
tables = [table[0] for table in cursor.fetchall()]
print(tables)

try:
    cursor.execute(f"CREATE DATABASE {backup_db_name}")
except Exception as err:
    print(f"Failed to Create Database called {backup_db_name}")
    cursor.execute("SHOW DATABASES;")
    dbs = [db[0] for db in cursor.fetchall()]
    print(f"Existing Databases are:\n{dbs}")
    raise Exception(f"Execption was {err}")

cursor.execute(f'USE {backup_db_name}')

for table in tables: 
    cursor.execute( 
        f'CREATE TABLE {table} SELECT * FROM {config.database}.{table}')