# -*- coding: utf-8 -*-

#Load the data
from google.colab import drive
drive.mount('/content/drive')

import pandas as pd

# save filepath to variable for easier access
football_europeen_league_path = '/content/drive/MyDrive/M2-DATA/Neo4J/Final-Project/Match.csv'
# read the data and store data in DataFrame football europeen league
football_europeen_league_data = pd.read_csv(football_europeen_league_path)

print(football_europeen_league_data.shape)

from termcolor import cprint
import matplotlib.pyplot as plt
import seaborn as sns

cprint('Valeurs total null de notre dataset :','green')
print(football_europeen_league_data.isnull().sum()) # trouver les valeurs null du dataset

plt.figure(figsize=(14,8))

# visualiser les valeurs null
sns.heatmap(football_europeen_league_data.isnull(), yticklabels = False, cmap='magma')
plt.title('Valeurs total null',size=20);
