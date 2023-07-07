import logo from './logo.svg';
import './App.css';
import MiComponente from './MiComponente';
import { SegundoComponente } from './SegundoComponente';
import { TercerComponente } from './TercerComponente';
import { Eventos } from './Eventos';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className='mis-componentes'>
                    <hr/>
                    <Eventos/>
                    <hr/>
                    <MiComponente/>
                    <hr/>
                    <SegundoComponente/>
                    <hr/>
                    <TercerComponente nombre="Daniel" apellidos="Vieites"/>
                </div>
            </header>
        </div>
    );
}

export default App;
