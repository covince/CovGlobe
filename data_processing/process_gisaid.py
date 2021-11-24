import pandas as pd
import tqdm
import numpy as np
import json
import datetime
tweets = []
columns_needed = ['covv_collection_date','covv_location','covv_lineage']
for line in open('provision.json', 'r'):
    initial = json.loads(line)
    
    final = dict(filter(lambda elem: elem[0] in columns_needed, initial.items()))
    tweets.append(final)

genomes = pd.DataFrame(tweets)
del tweets
genomes = genomes.rename(columns={'covv_collection_date':'Collection date','covv_location':'Location','covv_lineage':'Pango lineage'} )[['Collection date','Location','Pango lineage']]
parts = genomes.Location.str.split("/",expand=True)
genomes['country']=parts[1].str.strip()
genomes=genomes.drop(columns="Location").rename(columns={'Pango lineage':'Lineage','Collection date':"date"})
genomes = genomes[genomes["Lineage"]!="None"]
lineages = genomes[genomes['date'].str.len()>7].copy()
lineages.loc[lineages['country']=="USA","country"]="United States"
lineages=lineages[lineages.Lineage.notna()].copy()
countries = sorted([x for x in set(lineages.country.tolist()) if x is not None])
lineages = lineages[lineages.date.str.match(r'202.-[0-9][0-9]-[0-9][0-9]')==True]
lineages['date'] = pd.to_datetime(lineages['date'])
lineages.Lineage=  lineages.Lineage.astype("category")

min_date="2020-03-01"
max_date=datetime.datetime.today().strftime('%Y-%m-%d')

csv_file="full_data_table.csv"

import csv
with open(csv_file, 'w', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['lineage','date','country','count','period_count'])

for country in tqdm.tqdm(countries):
    country_set = lineages[lineages['country']==country]
    dfs=[]
    for date in pd.date_range(min_date,max_date,freq="7D"):
        restr = country_set[np.logical_and( country_set["date"] > date- pd.Timedelta(21,unit="D"), country_set["date"] < date + pd.Timedelta(1,unit="D"))]
        threeweek = restr.Lineage.value_counts()
        
        restr2 = country_set[np.logical_and( country_set["date"] > date- pd.Timedelta(7,unit="D"), country_set["date"] < date + pd.Timedelta(1,unit="D"))]
        oneweek = restr2.Lineage.value_counts()
        
        df = pd.DataFrame({'date':date,'country':country,'count':oneweek,'period_count':threeweek})
        df = df[df['period_count'] > 0]
        dfs.append(df)
    
    country_df = pd.concat(dfs)
    country_df = country_df.reset_index().rename(columns={'index':'lineage'})
    country_df.to_csv(csv_file, mode='a', index=False, header=False)
