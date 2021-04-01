import React from "react";
import "./Materials.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import Edit from "./Edit";

/**
 * 
 * The material component which does all the functionalies except the Edit. 
 */
export const Materials = material => {
  const [material_name, setMaterialName] = useState("");
  const [material_volume, setMaterial_volume] = useState("");
  const [material_deliverydate, setMaterial_deliverydate] = useState("");
  const [material_cost, setMaterial_cost] = useState("");
  const [material_color, setMaterial_color] = useState("");

  var selectedIndex = 0;

  const [materials, setMaterials] = useState([]);
  var [TotalCost, setTotalCost] = useState(0);

  const getMaterials = async () => {
    try {
      const response = await fetch("http://localhost:5000/materials");
      const jsonData = await response.json();

      console.log(jsonData);
      setMaterials(jsonData);

      TotalCost = 0;
      Object.keys(jsonData).forEach(function(key) {
        TotalCost =
          TotalCost +
          jsonData[key].material_cost * jsonData[key].material_volume;
      });
      console.log(TotalCost);
      setTotalCost(TotalCost);
    } catch (error) {
      console.log(error.message);
    }
  };
/**
 * 
 * @param {id of the respective material which is being selected} id 
 * @function {changes the selectedIndex to that particular id}
 */
  const selectMaterial = async id => {
    try {
      selectedIndex = id;
      console.log(selectedIndex);
    } catch (error) {
      console.log(error.message);
    }
  };
/**
 * Deletes the material at the selectedIndex
 */
  const deleteMaterial = async () => {
    try {
      console.log(selectedIndex);
      const deleteMaterial = await fetch(
        `http://localhost:5000/materials/${selectedIndex}`,
        {
          method: "DELETE"
        }
      );

      setMaterials(
        materials.filter(material => material.material_id !== selectedIndex)
      );
    } catch (error) {
      console.error(error.message);
    }
  };
/**
 * 
 * @param {response of body} e 
 */
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = {
        material_name: material_name,
        material_volume: material_volume,
        material_deliverydate: material_deliverydate,
        material_cost: material_cost,
        material_color: material_color
      };
      const response = await fetch("http://localhost:5000/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      getMaterials();
    } catch (error) {
      console.log(error.message);
    }
  };
/**
 * Dynamically calls getMaterials
 */
  useEffect(() => {
    getMaterials();
  }, []);

  /**
   * The UI of the Application
   */
  return (
    <Fragment>
      <div>
        <Container>
          <form onSubmit={onSubmitForm}>
            <Row>
              <Col>
                <label>
                  <h1>Materials</h1>
                </label>
                <br></br>
                <Container>
                  <button className="btn btn-success" type="submit">
                    Add
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => deleteMaterial()}
                  >
                    Delete
                  </button>
                  <Row>
                    <Col>
                      <div class="customtable">
                        <Card style={{ width: "15rem", height: "30rem" }}>
                          <table class="table">
                            {materials.map(material => (
                              <tr
                                onClick={() =>
                                  selectMaterial(material.material_id)
                                }
                              >
                                <td>
                                  <div
                                    style={{
                                      height: "20px",
                                      width: "20px",
                                      backgroundColor: material.material_color,
                                      borderRadius: "50%"
                                    }}
                                  ></div>
                                  <i>
                                    <span style={{ font: "20px" }}>
                                      {material.material_name}
                                      <br></br>{" "}
                                    </span>
                                    {material.material_volume} m3{" "}
                                    <Edit material={material} />
                                  </i>
                                </td>
                              </tr>
                            ))}
                            <tr style={{ color: "white" }}>
                              TotalCost is ${TotalCost}
                            </tr>
                          </table>
                        </Card>
                      </div>
                    </Col>
                    <Card style={{ width: "52rem", height: "30rem" }}>
                      <Col>
                        <Container>
                          <Row lg={12} style={{ padding: "20px" }}>
                            <Col lg={5}>
                              <label>Name </label>
                              <br></br>
                              <input
                                type="text"
                                value={material_name}
                                onChange={e => setMaterialName(e.target.value)}
                                required
                              ></input>
                            </Col>
                            <Col lg={5}>
                              <label>Color </label>
                              <br></br>
                              <input
                                type="color"
                                value={material_color}
                                onChange={e =>
                                  setMaterial_color(e.target.value)
                                }
                                required
                              ></input>
                            </Col>
                          </Row>
                          <Row lg={12} style={{ padding: "20px" }}>
                            <Col lg={5}>
                              Volume
                              <br></br>
                              <input
                                type="number"
                                value={material_volume}
                                onChange={e =>
                                  setMaterial_volume(e.target.value)
                                }
                                required
                              ></input>{" "}
                            </Col>
                            <Col lg={5}>
                              <label>Cost per mm</label>
                              <br></br>
                              <input
                                type="number"
                                value={material_cost}
                                onChange={e => setMaterial_cost(e.target.value)}
                                required
                              ></input>
                            </Col>
                          </Row>
                          <Row lg={12} style={{ padding: "25px" }}>
                            <Col>
                              <label>Delivery date</label>
                              <br></br>
                              <input
                                type="date"
                                value={material_deliverydate}
                                onChange={e =>
                                  setMaterial_deliverydate(e.target.value)
                                }
                                required
                              ></input>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Card>
                  </Row>
                </Container>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </Fragment>
  );
};
export default Materials;
