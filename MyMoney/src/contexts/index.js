import React, { createContext, useState} from 'react'

export const AppContext = createContext({})

function Context({children}){

    const [name, setName] = useState('');
    const [saldo, setSaldo] = useState(0);
    const [gastos, setGastos] = useState(0);
    const [hideContext, setHide] = useState(0);
    const [month,setMonth] = useState('')
    const [year, setYear] = useState('')
    const [movements, setMovements] = useState([])

    function setNameContext(receive){ setName(receive) };

    function setSaldoContext(receive){ setSaldo(receive) };

    function setGastosContext(receive){ setGastos(receive) };

    function setHideContext(receive){ setHide(receive) };

    function setMonthContext(receive){ setMonth(receive) };

    function setYearContext(receive){ setYear(receive) };

    function setMovementsContext(receive){ setMovements(receive) };


    return(
        <AppContext.Provider value={{
            setNameContext,name,
            setSaldoContext,saldo,
            setGastosContext,gastos,
            setHideContext,hideContext,
            setMonthContext,month,
            setYearContext,year,
            setMovementsContext,movements
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default Context;