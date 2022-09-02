import '@inovua/reactdatagrid-community/index.css'
import React, { useState,useEffect,useCallback } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { apiCustomers } from '../services/api';



const Clientes = () => {
  const [busca, setBusca] = useState('');
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [numPg, setNumPg] = useState(1);

  const {currentColor} = useStateContext();

  /*const filter = data.filter((obj) => {
    let stringReturn = ''
    let values = Object.values(obj).map(function(event){return event})

    values.map(function(event){
      if(typeof(event) === 'string'){
        stringReturn = stringReturn + event
      }
    })
    return stringReturn.toLocaleLowerCase().includes(busca.toLocaleLowerCase())
  })

  useEffect(() => {
    if(data.length === 0){
      searchCustomers()
    }
  },[]);
  */

  const [filterValue, setFilterValue] = useState([]);
  const [sortInfo, setSortInfo] = useState([]);

  const dataSource = useCallback(searchCustomers, [])

  async function searchCustomers({ skip, limit, sortInfo, groupBy }){
    
    console.log(skip)
    console.log(limit)
    console.log(sortInfo)
    console.log(groupBy)
    console.log(filterValue)
    

    /*try {
      const response = await apiCustomers.get(`/?pagesize=10&page=${numPg.toString()}`);
      //setData(response.data.items)

      setFilterValue(data.filter((obj) => {
        let stringReturn = ''
        let values = Object.values(obj).map(function(event){return event})

        values.map(function(event){
          if(typeof(event) === 'string'){
            stringReturn = stringReturn + event
          }
        })
        return stringReturn.toLocaleLowerCase().includes(busca.toLocaleLowerCase())
      }))
      
      

      setColumns(Object.keys(response.data.items[0]).map(function(event){
        return{
          name: event,
          header: event,
          defaultFlex: 1,
          minWidth: 150
        }
      }))

    } catch (error) {
      console.log(error);
    }*/
  }
  

  return(
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{marginBottom:'100px'}}>
      <div style={{justifyContent:'space-between',display:'flex'}}>
        <div style={{alignItems:'center',display:'flex'}}>
          <Header category="Cadastros" title="Clientes" />
        </div>
        
        <div style={{alignItems:'flex-end',display:'flex'}}>
          {/*<input 
            type="text" 
            value={busca}
            onChange={(event)=> setBusca(event.target.value)}
            placeholder="Pesquisar..."
            style={{
              borderWidth:1,
              borderRadius:10,
              padding:5,
              marginBottom:20,
              borderColor:currentColor
            }}
          />*/}
        </div>
      </div>

      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={dataSource}
        defaultFilterValue={[]}
        onSortInfoChange={setSortInfo}
        onFilterValueChange={setFilterValue}
        pagination
        style={{ minHeight: '70vh' }}
      />
    </div>
  )

}

export default Clientes;
