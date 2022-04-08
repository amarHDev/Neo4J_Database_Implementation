# -*- coding: utf-8 -*-

#Load the data
from google.colab import drive
drive.mount('/content/drive')

import sqlite3
import pandas as pd

# Create our connection.
cnx = sqlite3.connect('/content/drive/MyDrive/M2-DATA/Neo4J/Final-Project/database.sqlite')

df_Country = pd.read_sql_query("SELECT * FROM Country", cnx)
df_League = pd.read_sql_query("SELECT * FROM League", cnx)
df_Match = pd.read_sql_query("SELECT * FROM Match", cnx)
df_Team = pd.read_sql_query("SELECT * FROM Team", cnx)

df_Country.to_csv('/content/drive/MyDrive/M2-DATA/Neo4J/Final-Project/Country.csv')
df_League.to_csv('/content/drive/MyDrive/M2-DATA/Neo4J/Final-Project/League.csv')
df_Match.to_csv('/content/drive/MyDrive/M2-DATA/Neo4J/Final-Project/Match.csv')
df_Team.to_csv('/content/drive/MyDrive/M2-DATA/Neo4J/Final-Project/Team.csv')
