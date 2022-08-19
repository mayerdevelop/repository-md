import React from 'react'
import { Container } from './styles'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const SidebarItem = ({ Icon, Text }) => {

  const { singOut } = useContext(AuthContext);
  
  const handleSubmit = async () => {
    if(Text === 'Sair'){
      await singOut() 
    }
  };

  return (
    <Container onClick={handleSubmit}>
      <Icon />
      {Text}
    </Container>
  )
}

export default SidebarItem