import React, { Fragment, useState } from "react";
import Modal from "react-modal";
import { Container, Row, Col } from "react-bootstrap";
import "./Materials.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Materials from "./Materials";

/**
 * 
 * @param {The prop from the Material component, respective material is sent which is selected} param0 
 */
export const Edit = ({ material }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [material_name, setMaterialName] = useState(material.material_name);
  const [material_color, setMaterial_color] = useState(material.material_color);
  const [material_volume, setMaterial_volume] = useState(
    material.material_volume
  );
  const [material_cost, setMaterial_cost] = useState(material.material_cost);
  const [material_deliverydate, setMaterial_deliverydate] = useState(
    material.material_deliverydate
  );

  const [materials, setMaterials] = useState([]);
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
      const response = await fetch(
        `http://localhost:5000/materials/${material.material_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      setMaterials(materials.filter(material => material.material_id != 0));
      console.log(response);
    } catch (error) {}
  };
/**
 * Code of the Modal
 */
  return (
    <Fragment>
      <button className="btn btn-warning" onClick={() => setModalIsOpen(true)}>
        Edit
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={onSubmitForm}>
          <Container class="ModlContainer">
            <Row lg={12} style={{ padding: "20px" }}>
              <Col lg={5}>
                <label>Name </label>
                <br></br>
                <input
                  type="text"
                  class="Modl"
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
                  class="Modl"
                  value={material_color}
                  onChange={e => setMaterial_color(e.target.value)}
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
                  class="Modl"
                  value={material_volume}
                  onChange={e => setMaterial_volume(e.target.value)}
                  required
                ></input>{" "}
              </Col>
              <Col lg={5}>
                <label>Cost per mm</label>
                <br></br>
                <input
                  type="number"
                  class="Modl"
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
                  class="Modl"
                  value={material_deliverydate}
                  onChange={e => setMaterial_deliverydate(e.target.value)}
                  required
                ></input>
              </Col>
              <Col></Col>
            </Row>
            <button className="btn btn-warning">Edit</button>
            <button
              className="btn btn-danger"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
          </Container>
        </form>
      </Modal>
    </Fragment>
  );
};
export default Edit;
