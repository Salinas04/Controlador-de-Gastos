import NuevoPresupuesto from "./NuevoPresupuesto.jsx";
import ControlPresupuesto from "./ControlPresupuesto.jsx";

const Header = ({presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto,gastos,setGastos}) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {isValidPresupuesto ? (
                <ControlPresupuesto
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    gastos={gastos}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            ) : (
                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            )}

        </header>
    )
}


export default Header