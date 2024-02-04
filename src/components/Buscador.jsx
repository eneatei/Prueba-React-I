import { Form } from "react-bootstrap";

const Buscador = ({ setBusqueda }) => {

return (
<Form className="mb-3">
      <Form.Control
        type="text"
        placeholder="Buscar ciudad, temperatura, condición, humedad u hora de actualización..."
        onChange={(e)=> {
            setBusqueda(e.target.value);}}
      />
    </Form>

  )
};

export default Buscador