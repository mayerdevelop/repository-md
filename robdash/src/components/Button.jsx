import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

const Button = ({icon,bgColor,color,bgHoverColor,size,text,borderRadius,width,option}) => {
  const { setIsClicked, initialState, signOut } = useStateContext();

  async function handleButtom(){
    /*  options
      1- signout
      2- close profile
    */

    if(option === 1){
      signOut()
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
