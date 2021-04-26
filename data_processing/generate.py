import pandas as pd
import os
import tqdm
import json
from pathlib import Path
import numpy as np
import math
import simplejson

df = pd.read_csv("full_data_table.csv")

df = df[df['lad19cd']!="E09000001"]
df = df[df['lad19cd']!="E06000053"]
from datetime import datetime
from collections import defaultdict
by_ltla = defaultdict(list)

lineages = sorted(df['lineage'].unique().tolist())
parameters = df['parameter'].unique().tolist()

df = df.round(3)
for i, row in tqdm.tqdm(df.iterrows(),total = df.shape[0]):
    if math.isnan(row['mean'])  or math.isnan(row['lower'] )  or math.isnan(row['upper'] ):
        continue
    item = {
        'date':row['date'],
        'parameter': row['parameter'],
        'location': row['lad19cd'],
        'mean': row['mean'],
        'upper': row['upper'],
        'lower': row['lower'],
        'lineage' : row['lineage']
    }
    by_ltla[row['lad19cd']].append(item)



Path("../public/data/area").mkdir(parents=True, exist_ok=True)
Path("../public/data/lineage").mkdir(parents=True, exist_ok=True)


import json
for k,v in tqdm.tqdm(by_ltla.items()):
    with open(f'../public/data/area/{k}.json', 'w') as outfile:
        json.dump({'data':v}, outfile)

        
init_dict = json.loads(""" {"initialDate": "2020-12-26",
    "defaultLineage": "B.1.1.7",
    "frameLength":400,
    "defaultColorBy": "lambda",
    "colors":   ["#999933",
          "#117733",
          "#332288",
          "#CC6677",
          "#88CCEE",
          "#AA4499",
          "#882255",
          "#44AA99",
          "#DDDDDD" ],
    "parameters": [
        {
            "id": "lambda",
            "display": "Genomes per week"
        },
        {
            "id": "p",
            "display": "Proportion"
        }
    ],
    "chartDefinitions": [
        {
            "parameter": "lambda",
            "heading": "Genomes per week",
            "defaultType": "line",
            "allowStack": true
        },
        {
            "parameter": "p",
            "heading": "Proportion",
            "defaultType": "area",
            "allowStack": true
        }
    ],
    "overview": {
        "heading": "Overview",
        "category": "All countries",
        "subnoun_singular": "Country",
        "subnoun_plural": "countries",
        "short_text": "World"
    }}""")
init_dict['areas'] = list(by_ltla.keys())

init_dict['lineages'] = lineages
with open(f'./output/data/lists.json', 'w') as outfile:
                json.dump(init_dict, outfile)



for lineage in lineages:
    for parameter in tqdm.tqdm(parameters):
        subset = df[df['lineage']==lineage]
        subset = subset[subset['parameter']==parameter]
        print(lineage,parameter)
        b=subset.pivot(columns="date",index="lad19cd",values="mean")
        values = b.values.tolist()
        dates = b.columns.tolist()
        ltlas = b.index.tolist()
        try:
            os.mkdir(f'../public/data/lineage/{lineage}')
        except FileExistsError:
            pass
        with open(f'../public/data/lineage/{lineage}/{parameter}.json', 'w') as outfile:
            simplejson.dump({'dates':dates,'areas':ltlas,'values':values}, outfile,  ignore_nan=True)
        
