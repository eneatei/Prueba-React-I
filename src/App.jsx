import MiApi from "./components/MiApi"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

return (
<div className="container">
        <h1 className="text-star pt-5 m-4" >
          Condición actual del clima en Chile
        </h1>
        <MiApi />
    </div>
  );
}

export default App