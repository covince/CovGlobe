# Map production

* Based on [Natural Earth 1:50m cultural admin 0 countries](https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/cultural/ne_50m_admin_0_countries.zip) (accessed 1 December 2021)
* The following steps were applied using [https://mapshaper.org/](https://mapshaper.org/)
  * Simplified to 30%, selecting "prevent shape removal"
  * Deleted Antarctica
  * Ran the following console commands:
    * `filter-fields NAME_LONG,SUBREGION`
    * `rename-fields 'area_id=NAME_LONG,area_description=SUBREGION'`
* The following features (GISAID values shown) were substituted from [Natural Earth 1:50m cultural admin 0 map units](https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/cultural/ne_50m_admin_0_map_units.zip) (accessed 2 December 2021), processed as above.
  * French Guiana
  * Guadeloupe
  * Martinique
  * Mayotte
  * Reunion
* The following alterations were made to allow data linkage. The GISAID value is used as the identifier and the Natural Earth value is used as the display value.
<table>
  <thead>
    <tr>
      <th>GISAID (`area_id`)</th>
      <th>Natural Earth NAME_LONG (`area_name`)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Brunei</th>
      <th>Brunei Darussalam</th>
    </tr>
    <tr>
      <th>Cabo Verde</th>
      <th>Republic of Cabo Verde</th>
    </tr>
    <tr>
      <th>Cote d'Ivoire</th>
      <th>Côte d'Ivoire</th>
    </tr>
    <tr>
      <th>Curacao</th>
      <th>Curaçao</th>
    </tr>
    <tr>
      <th>Eswatini</th>
      <th>Swaziland</th>
    </tr>
    <tr>
      <th>Faroe Islands</th>
      <th>Faeroe Islands</th>
    </tr>
    <tr>
      <th>Gambia</th>
      <th>The Gambia</th>
    </tr>
    <tr>
      <th>Laos</th>
      <th>Lao PDR</th>
    </tr>
    <tr>
      <th>Reunion</th>
      <th>Réunion</th>
    </tr>
    <tr>
      <th>Saint Barthelemy</th>
      <th>Saint-Barthélemy</th>
    </tr>
    <tr>
      <th>Saint Martin</th>
      <th>Saint-Martin</th>
    </tr>
    <tr>
      <th>Slovak Republic</th>
      <th>Slovakia</th>
    </tr>
    <tr>
      <th>South Korea</th>
      <th>Republic of Korea</th>
    </tr>
    <tr>
      <th>The Bahamas</th>
      <th>Bahamas</th>
    </tr>
    <tr>
      <th>USA</th>
      <th>United States</th>
    </tr>
    <tr>
      <th>U.S. Virgin Islands</th>
      <th>United States Virgin Islands</th>
    </tr>
  </tbody>
</table>
