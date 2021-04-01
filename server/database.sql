CREATE DATABASE cesium;

CREATE TABLE materials(
    material_id SERIAL PRIMARY KEY,
    material_name VARCHAR(255),
    material_volume INT,
    material_deliverydate VARCHAR(255),
    material_cost NUMERIC(8,2),
    material_color VARCHAR(255)
);