import React, { createContext, useState} from 'react'
import {numberToReal,sumTotals} from '../utils/numberToReal';

export const AppContext = createContext({})

function Context({children}){
    
    const meses = [null,"Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

    const [name, setName] = useState('');
    const [saldo, setSaldo] = useState(0);
    const [gastos, setGastos] = useState(0);
    const [hideContext, setHide] = useState(0);
    const [month,setMonth] = useState('')
    const [year, setYear] = useState('')
    const [movements, setMovements] = useState([])
    const [valueChk,setValueChk] = useState(1)
    const [dateFormat, setDateFormat] = useState('Selecione a data');
    const [dateForm, setdateForm] = useState(dateFormat);
    const [value, setValue] = useState(0);
    const [descri, setDescri] = useState('');
    const [list, setList] = useState([]);
    const [mode, setMode] = useState('calendar');
    const [visiblePreview, setVisiblePreview] = useState(false);
    const [icon,setIcon] = useState(null);

    function setNameContext(receive){ setName(receive) };
    function setSaldoContext(receive){ setSaldo(receive) };
    function setGastosContext(receive){ setGastos(receive) };
    function setHideContext(receive){ setHide(receive) };
    function setMonthContext(receive){ setMonth(receive) };
    function setYearContext(receive){ setYear(receive) };
    function setMovementsContext(receive){ setMovements(receive) };

    function setValueChkContext(receive){ setValueChk(receive) };
    function setDateFormatContext(receive){ setDateFormat(receive) };
    function setdateFormContext(receive){ setdateForm(receive) };
    function setValueContext(receive){ setValue(receive) };
    function setDescriContext(receive){ setDescri(receive) };
    function setVisiblePreviewContext(receive){ setVisiblePreview(receive) };
    function setIconContext(receive){ setIcon(receive) };

    async function filterDate(mov,newMes,ano){
        const newList = []

        let mes = meses.indexOf(newMes) + "";
        while (mes.length < 2) mes = "0" + mes;

        mov.forEach((item) => {
            if (item.date.substring(0,6) === ano+mes){
            newList.push(item)
            }
        })

        setList(newList)
    }

    function fSaldoGasto(movements,newMes,lmuda,ano){
        let aEntrada = []
        let aSaida = []
        let nEntrada = 0
        let nSaida = 0

        let mesAux = meses.indexOf(newMes) + "";

        while (mesAux.length < 2) mesAux = "0" + mesAux;
        
        movements.forEach((item) => {
            if (item.date.substring(0,6) === ano+mesAux){
            if (item.type === 0){
                aEntrada.push(item)
            }else {
                aSaida.push(item)
            }
            }
        })
        
        if (aEntrada.length > 0){
            nEntrada = sumTotals(aEntrada, ',').replace(',','.')
        }else{
            nEntrada = 0
        }

        if (aSaida.length > 0){
            nSaida = sumTotals(aSaida, ',').replace(',','.')
        }else{
            nSaida = 0
        }

        console.log(nSaida)
        
        if (nEntrada > 0 || lmuda){setSaldo(numberToReal(nEntrada-nSaida))}
        if (nSaida > 0 || lmuda) {setGastos(numberToReal(nSaida-0))}
    }

    function setShowMode(receive){
        setMode(receive)
        setVisiblePreview(true)
    }


    return(
        <AppContext.Provider value={{
            setNameContext,name,
            setSaldoContext,saldo,
            setGastosContext,gastos,
            setHideContext,hideContext,
            setMonthContext,month,
            setYearContext,year,
            setMovementsContext,movements,
            setValueChkContext,valueChk,
            setDateFormatContext,dateFormat,
            setdateFormContext,dateForm,
            setValueContext,value,
            setDescriContext,descri,
            filterDate,list,
            fSaldoGasto,
            setShowMode,mode,
            setVisiblePreviewContext,visiblePreview,
            setIconContext,icon
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default Context;