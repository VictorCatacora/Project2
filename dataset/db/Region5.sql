DROP TABLE KPIDaily_Nodes 
DROP TABLE CMData_Nodes
CREATE TABLE KPIDaily_Nodes (
id INT PRIMARY KEY,
dates Date,
rnc TEXT,
nodebname TEXT,
availability double precision,
cs_call_completion double precision,
ps_call_completion double precision,
throughput_kbps double precision, 
rtwp double precision,
traffic double precision,
traffic_mb double precision,
propagation_mts double precision,
quality_ecno double precision,
goodquality double precision,
users_data double precision,
users_total double precision,
coverage_rscp  double precision
);

CREATE TABLE CMData_Nodes (
id INT PRIMARY KEY,
cell TEXT,
rnc TEXT,
site TEXT,
site_name TEXT,
uarfcn integer,
azimuth real,
height double precision,
latitude double precision,
longitude double precision
);

CREATE TABLE KPIDaily_Cell (
id INT PRIMARY KEY,
dates Date,
rnc TEXT,
cellname TEXT,
nodebname TEXT,
availability double precision,
cs_call_completion double precision,
ps_call_completion double precision,
throughput_kbps double precision, 
rtwp double precision,
traffic double precision,
traffic_mb double precision,
propagation_mts double precision,
quality_ecno double precision,
goodquality double precision,
users_data double precision,
users_total double precision,
coverage_rscp  double precision
);
