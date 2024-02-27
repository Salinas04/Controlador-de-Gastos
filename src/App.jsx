import {useState,useEffect} from 'react'
import Header from "./components/Header.jsx";
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from "./components/Modal.jsx";
import {generarID} from "./helpers/index.js";
import ListadoGastos from "./components/ListadoGastos.jsx";
import Filtros from "./components/Filtros.jsx";

function App() {

    const [presupuesto, setPresupuesto] = useState(JSON.parse(localStorage.getItem('presupuesto')) ?? '')
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

    const [modal,setModal] = useState(false)
    const [animarModal,setAnimarModal] = useState(false)

    const [gastos,setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) ?? [])

    const [gastoEditar,setGastoEditar] = useState({})

    const [filtro,setFiltro] = useState('')
    const [gastosFiltrados,setGastosFiltrados] = useState([])

    useEffect(() => {
        if (filtro){
            const gastosFiltrados= gastos.filter(gasto => gasto.categoria === filtro)
            setGastosFiltrados(gastosFiltrados)
        }
    }, [filtro]);

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0){
            setModal(true)

            setTimeout(() =>{
                setAnimarModal(true)
            },500)
        }
    }, [gastoEditar]);

    useEffect(() => {
        localStorage.setItem('presupuesto',JSON.stringify(presupuesto))
    }, [presupuesto]);

    useEffect(() => {
        localStorage.setItem('gastos',JSON.stringify(gastos))
    }, [gastos]);

    useEffect(() => {
        const presupuestoLS = JSON.parse(localStorage.getItem('presupuesto'))

        if (presupuestoLS > 0){
            setIsValidPresupuesto(true)
        }
    }, []);

    const handleNuevoGasto = () =>{
        setModal(true)
        setGastoEditar({})

        setTimeout(() =>{
            setAnimarModal(true)
        },500)
    }

    const guardarGasto = gasto => {
        if (gasto.id){
            const gastosActualizados = gastos.map(gastoState => gastoState.id ===
            gasto.id ? gasto : gastoState)

            setGastos(gastosActualizados)
            setGastoEditar({})
        }else {
            gasto.id = generarID()
            gasto.fecha = Date.now()
            setGastos([...gastos,gasto])
        }

        setAnimarModal(false)
        setTimeout(()=>{
            setModal(false)
        },500)
    }

    const eliminarGasto = id => {
        const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
        setGastos(gastosActualizados)
    }

    return (
        <div className={modal ? 'fijar':''}>
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros
                            filtro={filtro}
                            setFiltro={setFiltro}
                        />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            gastosFiltrados={gastosFiltrados}
                            filtro={filtro}
                        />
                    </main>
                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="Icono nuevo gasto"
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}

            {modal &&
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />}

        </div>
    )
}

export default App
