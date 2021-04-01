const express = require("express")
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());

app.use(express.json());



//create material

app.post("/materials", async(req,res) => {
    try{
        const {material_name} = req.body;
        const {material_volume} = req.body;
        const {material_deliverydate} = req.body;
        const {material_cost} = req.body;
        const {material_color} = req.body;
       
        const resMaterial = await pool.query("INSERT INTO materials (material_name, material_volume, material_deliverydate,material_cost,material_color) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [material_name, material_volume, material_deliverydate, material_cost, material_color]);
        res.json(resMaterial.rows[0]);
    }
    catch(err)
    {
        console.log(err.message);
    }
})

//get all materials
app.get("/materials", async(req,res) =>
{
    try {
        const getMaterials = await pool.query("SELECT * FROM materials")
        res.json(getMaterials.rows);
    } catch (error) {
        console.log(error.message)
    }
})

//get a material
app.get("/materials/:material_id", async(req,res) => {
    try {
        const {material_id} = req.params;

        const material = await pool.query("SELECT * FROM materials WHERE material_id = $1",[material_id]);

        res.json(material.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
})

//updating a material

app.put("/materials/:material_id", async(req,res) =>
{
    try{
        const {material_id}  = req.params;
        const {material_name} = req.body;
        const {material_volume} = req.body;
        const {material_deliverydate} = req.body;
        const {material_cost} = req.body;
        const {material_color} = req.body;

        const updateMaterial = await pool.query("UPDATE materials SET material_name = $1, material_volume = $2, material_deliverydate = $3,material_cost = $4,material_color = $5 WHERE material_id =$6",
        [material_name, material_volume, material_deliverydate, material_cost, material_color,material_id]);
       res.json("material was updated");
    }
    catch(error)
    {
        console.log(error.message);
    }
})

//delete a material

app.delete("/materials/:material_id", async(req,res) =>
{
    try {
        const {material_id} = req.params;

        const deleteMaterial = await pool.query("DELETE FROM materials WHERE material_id = $1",[material_id]);

        res.json("Material was deleted");
    } catch (error) {
        console.log(error.message);
    }
})



app.listen(5000, () => {
    console.log("Cesium Server has started on port 5000");
});