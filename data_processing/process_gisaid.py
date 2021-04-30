import pandas as pd
import tqdm
import numpy as np
genomes = pd.read_csv("metadata.tsv",sep="\t")
genomes = genomes[['Collection date','Location','Pango lineage']]
parts = genomes.Location.str.split("/",expand=True)
genomes['country']=parts[1].str.strip()
genomes=genomes.drop(columns="Location").rename(columns={'Pango lineage':'Lineage','Collection date':"date"})
lineages = genomes[genomes['date'].str.len()>7].copy()
lineages.loc[lineages['country']=="USA","country"]="United States"
lineages=lineages[lineages.Lineage.notna()].copy()
selected_lineages = ["A","B","B.1.177","B.1.1.7","B.1.351","P.1","B.1.617","B.1.525","B.1.526"]
lineages['new_lineage'] = 'other'
for lin in selected_lineages:
    lineages.loc[lineages['Lineage'].str.startswith(f"{lin}."),'new_lineage']=lin
    lineages.loc[lineages['Lineage'] == lin,'new_lineage']=lin
lineages = lineages.drop(columns="Lineage").rename(columns={'new_lineage':'Lineage'})
#countries = sorted(set(lineages.country.tolist()).intersection(cases['location'].tolist()))
countries = sorted([x for x in set(lineages.country.tolist()) if x is not None])
lineages = lineages[lineages.date.str.match(r'202.-[0-9][0-9]-[0-9][0-9]')==True]
lineages['date'] = pd.to_datetime(lineages['date'])
lineages.Lineage=  lineages.Lineage.astype("category")
import tqdm
import numpy as np

min_date="2020-03-01"
max_date="2021-04-12"

dfs = []

for country in tqdm.tqdm(countries+['overview']):
    if country=='overview':
        country_set= lineages
    else:
        country_set = lineages[lineages['country']==country]
    for date in  pd.date_range(min_date,max_date):
        restr = country_set[
np.logical_and( country_set["date"] > date- pd.Timedelta(11.5,unit="D"), country_set["date"] < date + pd.Timedelta(11.5,unit="D"))]
        counts = restr.Lineage.value_counts()
        props = counts/counts.sum()
        if counts.sum()<3:
            props=pd.NA
        if counts.sum()==0:
            counts=counts*pd.NA
        
        new_df = pd.DataFrame({'lambda':counts/3,'p':props,'ltla':country,'date':date})
        dfs.append(new_df)
big_df = pd.concat(dfs)
big_df = big_df.reset_index().rename(columns={'index':'lineage'})
big_df = big_df.melt(value_vars=['lambda','p'],id_vars=['date','ltla','lineage'], value_name = "mean",var_name="parameter")
big_df['lower'] = big_df['mean']
big_df['upper'] = big_df['mean']
big_df=big_df.rename(columns = {'ltla':'lad19cd'})
big_df.to_csv("full_data_table.csv")


