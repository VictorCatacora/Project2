
import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

connection_string = "postgres:bsb4ever@localhost:5432/Region5"
engine = create_engine(f'postgresql://{connection_string}')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

kpidaily_nodes = Base.classes.kpidaily_nodes
cmdata_nodes = Base.classes.cmdata_nodes
kpidaily_cell = Base.classes.kpidaily_cell

app = Flask(__name__)

db = SQLAlchemy(app)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/kpisite")
def kpisite():
    """Return the sitesheet."""
    return render_template("site.html")

@app.route("/kpicell")
def kpicell():
    """Return the cellsheet."""
    return render_template("cell.html")

@app.route("/sitemaps")
def maps():
    """Return the mapsheet."""
    return render_template("maps.html")

@app.route("/kpicell/cellspmdata/<siteid>")
def graphskpicell(siteid):
    session = Session(engine)
    kpi_cells_df=pd.read_sql_query('select * from kpidaily_cell', con=engine)
    session.close()
    kpi_cellsbyNode_df=kpi_cells_df.loc[kpi_cells_df["nodebname"] == siteid, :]
    kpi_groupbyNode=kpi_cellsbyNode_df.groupby("cellname")
    kpi_groupbyNode=kpi_groupbyNode.mean()
    kpi_groupbyNode=pd.DataFrame(kpi_groupbyNode, columns=["availability","cs_call_completion","ps_call_completion","throughput_kbps","propagation_mts","quality_ecno","users_total","coverage_rscp","rtwp","traffic","traffic_mb","goodquality","users_data"])
    kpi_groupbyNode=kpi_groupbyNode.reset_index()
    kpi_groupbyNode=kpi_groupbyNode.reset_index()
    kpi_groupbyNode= kpi_groupbyNode.sort_values(by=['cellname'])
    kpi_groupbyNode_json=kpi_groupbyNode.to_json(orient='records')
   
    return kpi_groupbyNode_json

@app.route("/kpicell/pmdata/<cellid>")
def graphskpicellid(cellid):
    session = Session(engine)
    kpi_cells_df=pd.read_sql_query('select * from kpidaily_cell', con=engine)
    session.close()
    kpi_groupbyNode=kpi_cells_df.loc[kpi_cells_df["cellname"] == cellid, :]

    data ={
        "cellname": kpi_groupbyNode.cellname.tolist(),
        "cs_call_completion": kpi_groupbyNode.cs_call_completion.tolist(),
        "ps_call_completion": kpi_groupbyNode.ps_call_completion.tolist(),
        "throughput_kbps": kpi_groupbyNode.throughput_kbps.tolist(),
        "propagation_mts": kpi_groupbyNode.propagation_mts.tolist(),
        "quality_ecno": kpi_groupbyNode.quality_ecno.tolist(),
        "users_total": kpi_groupbyNode.users_total.tolist(),
        "coverage_rscp": kpi_groupbyNode.coverage_rscp.tolist(),
        "rtwp": kpi_groupbyNode.rtwp.tolist(),
        "traffic": kpi_groupbyNode.traffic.tolist(),
        "traffic_mb": kpi_groupbyNode.traffic_mb.tolist(),
        "goodquality": kpi_groupbyNode.goodquality.tolist(),
        "users_data": kpi_groupbyNode.users_data.tolist(),
        "dates": kpi_groupbyNode.dates.tolist(),
    }
   
    return jsonify(data)

@app.route("/kpisite/CData/<siteid>")
def sample_nodes(siteid):
    session = Session(engine)

    """Return a list of all site names"""
    cmdata_nodes_df= pd.read_sql_query('select * from cmdata_nodes', con=engine)
    session.close()
    cmdata_nodes_df=cmdata_nodes_df.loc[:, ["rnc","site", "site_name","cell","azimuth","latitude","longitude","uarfcn","height"]]
    sites_filter = cmdata_nodes_df.loc[cmdata_nodes_df["site"] == siteid, :]
    sites_filter = sites_filter.sort_values("cell")
    sites_json=sites_filter.to_json(orient='records')
   
    return sites_json

@app.route("/kpisite/pmdata/<siteid>")
def graphskpisite(siteid):
    session = Session(engine)
    kpi_nodes_df=pd.read_sql_query('select * from kpidaily_nodes', con=engine)
    session.close()
    kpi_nodes_sitekpi_df=kpi_nodes_df.loc[kpi_nodes_df["nodebname"] == siteid, :]
    data ={
        "dates": kpi_nodes_sitekpi_df.dates.tolist(),
        "cs_call_completion": kpi_nodes_sitekpi_df.cs_call_completion.tolist(),
        "ps_call_completion": kpi_nodes_sitekpi_df.ps_call_completion.tolist(),
        "throughput_kbps": kpi_nodes_sitekpi_df.throughput_kbps.tolist(),
        "propagation_mts": kpi_nodes_sitekpi_df.propagation_mts.tolist(),
        "quality_ecno": kpi_nodes_sitekpi_df.quality_ecno.tolist(),
        "users_total": kpi_nodes_sitekpi_df.users_total.tolist(),
        "coverage_rscp": kpi_nodes_sitekpi_df.coverage_rscp.tolist(),
        "rtwp": kpi_nodes_sitekpi_df.rtwp.tolist(),
        "traffic": kpi_nodes_sitekpi_df.traffic.tolist(),
        "traffic_mb": kpi_nodes_sitekpi_df.traffic_mb.tolist(),
        "goodquality": kpi_nodes_sitekpi_df.goodquality.tolist(),
        "users_data": kpi_nodes_sitekpi_df.users_data.tolist(),
        "nodebname": kpi_nodes_sitekpi_df.nodebname.tolist(),
    }
   
    return jsonify(data)

@app.route("/kpisite/table/<siteid>")
def kpi_nodes(siteid):
    session = Session(engine)

    """Return a list of all site names"""
    kpi_nodes_df=pd.read_sql_query('select * from kpidaily_nodes', con=engine)
    session.close()
    site_kpi = kpi_nodes_df.loc[kpi_nodes_df["nodebname"] == siteid, :]
    data ={
        "dates": site_kpi.dates.tolist(),
        "cs_call_completion": site_kpi.cs_call_completion.tolist(),
        "ps_call_completion": site_kpi.ps_call_completion.tolist(),
        "throughput_kbps": site_kpi.throughput_kbps.tolist(),
        "propagation_mts": site_kpi.propagation_mts.tolist(),
        "quality_ecno": site_kpi.quality_ecno.tolist(),
        "users_total": site_kpi.users_total.tolist(),
        "coverage_rscp": site_kpi.coverage_rscp.tolist(),

    }
    return jsonify(data)

@app.route("/pie")
def rnctraffic():
      """Return `pie data`"""
      session = Session(engine)
      kpi_nodes_df=pd.read_sql_query('select * from kpidaily_nodes', con=engine)
      session.close()
      kpi_nodes_rnc_df=kpi_nodes_df.groupby("rnc")
      kpi_nodes_rnc_df=kpi_nodes_rnc_df.sum()
      kpi_nodes_byrnc_df=pd.DataFrame(kpi_nodes_rnc_df, columns=["traffic","traffic_mb","users_data","users_total"])
      kpi_nodes_byrnc_df=kpi_nodes_byrnc_df.reset_index()

      data = {
        "traffic": kpi_nodes_byrnc_df.traffic.tolist(),
        "rnc": kpi_nodes_byrnc_df.rnc.tolist(),
        "traffic_mb":kpi_nodes_byrnc_df.traffic_mb.tolist(),
        "users_data":kpi_nodes_byrnc_df.users_data.tolist(),
        "users_total":kpi_nodes_byrnc_df.users_total.tolist()
      }
    
      return jsonify(data)

@app.route("/barrnc")
def rncbar():
      """Return bar data`"""
      session = Session(engine)
      kpi_nodes_df=pd.read_sql_query('select * from kpidaily_nodes', con=engine)
      session.close()
      kpi_nodes_rnc_df=kpi_nodes_df.groupby("rnc")
      kpi_nodes_rnc_df=kpi_nodes_rnc_df.mean()
      kpi_nodes_byrnc_df=pd.DataFrame(kpi_nodes_rnc_df, columns=["cs_call_completion","ps_call_completion","throughput_kbps","goodquality"])
      kpi_nodes_byrnc_df=kpi_nodes_byrnc_df.reset_index()

      databarrnc = {
        "cs_call_completion": kpi_nodes_byrnc_df.cs_call_completion.tolist(),
        "rnc": kpi_nodes_byrnc_df.rnc.tolist(),
        "ps_call_completion":kpi_nodes_byrnc_df.ps_call_completion.tolist(),
        "throughput_kbps":kpi_nodes_byrnc_df.throughput_kbps.tolist(),
        "goodquality":kpi_nodes_byrnc_df.goodquality.tolist()
      }
    
      return jsonify(databarrnc)
      

@app.route("/kpisite/site/<rncid>")
def site(rncid):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all site names"""
    # Query all passengers
    cmdata_nodes_df= pd.read_sql_query('select * from cmdata_nodes', con=engine)
    cmdata_nodes_df=cmdata_nodes_df.loc[:, ["rnc", "site"]]
    sites = cmdata_nodes_df.loc[cmdata_nodes_df["rnc"] == rncid, :]
    sites = sites.sort_values("site")
    site_list=sites['site'].values.tolist()
    all_site = list(dict.fromkeys(site_list))
    session.close()
    return jsonify(all_site)

@app.route("/kpicell/<siteid>")
def cell(siteid):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all site names"""
    # Query all passengers
    pmdata_nodes_df= pd.read_sql_query('select * from kpidaily_cell', con=engine)
    pmdata_nodes_df=pmdata_nodes_df.loc[:, ["nodebname", "cellname"]]
    cells = pmdata_nodes_df.loc[pmdata_nodes_df["nodebname"] == siteid, :]
    cells = cells.sort_values("cellname")
    cells_list=cells['cellname'].values.tolist()
    all_cells = list(dict.fromkeys(cells_list))
    session.close()
    return jsonify(all_cells)

@app.route("/topoffender/<rncid>")
def topoffender(rncid):
    # Create our session (link) from Python to the DB
    session = Session(engine)
    kpi_nodes_df=pd.read_sql_query('select * from kpidaily_nodes', con=engine)
    session.close()

    """Return a list of all site names"""
    # Query all passengers
    kpi_nodes_site_df = kpi_nodes_df.loc[kpi_nodes_df["rnc"] == rncid, :]
    kpi_nodes_site_df=kpi_nodes_site_df.groupby("nodebname")
    kpi_nodes_site_df=kpi_nodes_site_df.mean()
    kpi_nodes_site_df=pd.DataFrame(kpi_nodes_site_df, columns=["cs_call_completion","ps_call_completion","throughput_kbps","goodquality"])
    kpi_nodes_site_df=kpi_nodes_site_df.reset_index()
    kpi_topoffender_site_pd=kpi_nodes_site_df.sort_values(by=['throughput_kbps'])
    kpi_topoffender_site_pd=kpi_topoffender_site_pd.head(20)
    kpitop = {
        "cs_call_completion": kpi_topoffender_site_pd.cs_call_completion.tolist(),
        "nodebname": kpi_topoffender_site_pd.nodebname.tolist(),
        "ps_call_completion":kpi_topoffender_site_pd.ps_call_completion.tolist(),
        "throughput_kbps":kpi_topoffender_site_pd.throughput_kbps.tolist(),
        "goodquality":kpi_topoffender_site_pd.goodquality.tolist()
      }
    return jsonify(kpitop)

@app.route("/RNC")
def rnc():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all rnc names"""
    # Query all passengers
    results = session.query(cmdata_nodes.rnc).all()

    session.close()

    # Convert list of tuples into normal list
    all_rnc = list(np.ravel(results))
    all_rnc = list(dict.fromkeys(all_rnc))
    ##all_rnc=all_rnc.sort()
    return jsonify(all_rnc)

@app.route("/sitename")
def sitename(rncid):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all site names"""
    # Query all passengers
    cmdata_nodes_df= pd.read_sql_query('select * from cmdata_nodes', con=engine)
    cmdata_nodes_df=cmdata_nodes_df.loc[:, ["rnc", "site_name"]]
    sites = cmdata_nodes_df.loc[cmdata_nodes_df["rnc"] == rncid, :]
    sitename_list=sites['site_name'].values.tolist()
    all_sitename = list(dict.fromkeys(sitename_list))
    session.close()
    return jsonify(all_sitename)



@app.route("/CData")
def cmdata():
    with open('csvjson.json', 'r') as myfile:
        data=myfile.read()

    # session = Session(engine)

    # """Return a list of all site names"""
    # cmdata_nodes_df= pd.read_sql_query('select * from cmdata_nodes', con=engine)
    # session.close()
    # cmdata_nodes_json=cmdata_nodes_df.to_json(orient='records')
   
 
    return data 

if __name__ == "__main__":
    app.run()
