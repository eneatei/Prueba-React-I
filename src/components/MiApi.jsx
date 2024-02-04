import axios from "axios";
import { useEffect, useState } from "react";
import Buscador from "./Buscador";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faTint, faClock, faSun, faSnowflake, faCloudSun } from '@fortawesome/free-solid-svg-icons';


const urlApi = "https://api.boostr.cl/weather.json"

const MiApi = () => {
const [climas, setClimas] = useState([]);
const [busqueda, setBusqueda] = useState("");

const traerClimas = async () => {
  try {
    const { data } = await axios.get(urlApi);
    const dataOrdenada = data.data.sort((a, b) => a.city.localeCompare(b.city));
    setClimas(dataOrdenada);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

useEffect(() => {
traerClimas();
}, []);

const backgroundCards = (temperature) => {
  if (temperature < 10) {
    return "bg-primary text-white";
  } else if (temperature >= 10 && temperature < 20) {
    return "bg-success text-white";
  } else if (temperature >= 20 && temperature < 30) {
    return "bg-warning text-dark";
  } else {
    return "bg-danger text-white";
  }
};

const iconosCards = (temperature) => {
  if (temperature < 10) {
    return faSnowflake;
  } else if (temperature >= 10 && temperature < 25) {
    return faCloudSun;
  } else {
    return faSun;
  }
};

return (
  <Container className="mt-5">
<Buscador className="mb-3" busqueda={busqueda} setBusqueda={setBusqueda}/>
    <Row xs={1} md={2} lg={4} className="g-4">
      {climas
        .filter((clima) =>
          clima.city.toLowerCase().includes(busqueda) ||
          clima.temperature.toString().includes(busqueda) ||
          clima.condition.toLowerCase().includes(busqueda) ||
          clima.humidity.toString().includes(busqueda) ||
          clima.updated_at.toLowerCase().includes(busqueda)
        )
        .map((clima) => (
          <Col key={clima.city}>
              <Card className={`mb-3 ${backgroundCards(clima.temperature)}`}>
                <Card.Body className="text-center mt-3 mb-3">
                <Card.Title className="mb-4"> {clima.city}</Card.Title>
                  <FontAwesomeIcon icon={iconosCards(clima.temperature)} size="4x"
                    className={`mb-2 text-${backgroundCards(clima.temperature)}`}/>
                  <Card.Title className="mt-2 mb-4">{clima.temperature}°C</Card.Title>
                  <Card.Text><FontAwesomeIcon icon={faCloud} /> {clima.condition}</Card.Text>
                  <Card.Text><FontAwesomeIcon icon={faTint} /> {clima.humidity}%</Card.Text>
                  <Card.Text><FontAwesomeIcon icon={faClock} /> {clima.updated_at}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};


export default MiApi;
