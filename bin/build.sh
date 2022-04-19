#! /bin/bash
set -e

vite build

if [ -z $GISAID_USERNAME ] && [ -z $GISAID_PW ]; then
  echo "GISAID_USERNAME and GISAID_PW must be set"
  exit 1
fi

cd data_processing
curl -u $GISAID_USERNAME:$GISAID_PW https://www.epicov.org/epi3/3p/varsurv02/export/provision.json.xz | xz -d -T0  > ./provision.json
pip install pandas tqdm
python ./data_processing.py
