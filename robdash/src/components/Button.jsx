import React from 'react';
import api from '../services/api';

import { useStateContext } from '../contexts/ContextProvider';

const Button = ({icon,bgColor,color,bgHoverColor,size,text,borderRadius,width,option}) => {
  const { setIsClicked, initialState } = useStateContext();

  async function handleButtom(){
    /*  options
      1- login
      2- close profile
    */

    if(option === 1){
      try{
        const response = await api.post('/PRTL001',{"USUARIO": "TIM", "SENHA": "r"})
        
        alert(JSON.stringify(response.data.statusrequest[0]))
      }catch(error){
        alert(error)
      }
    }

    if(option === 2){
      setIsClicked(initialState)
    }

  }

  return (
    <button
      type="button"
      onClick={() => handleButtom()}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
