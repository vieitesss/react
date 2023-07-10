import { Ejercicio } from "./components/Ejercicio";
import { MiPrimerEstado } from "./components/MiPrimerEstado";

function App() {
    return (
        <div className="app">
            <h1 className="flex-item">Hook useState</h1>
            <br/>
            <MiPrimerEstado/>
            <Ejercicio year={new Date().getFullYear()}/>
        </div>
    );
}

export default App;
