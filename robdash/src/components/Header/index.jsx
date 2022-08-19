import React from "react";
import {Container,ContUser} from "./styles";

const Header = () =>{
    const storageUser = localStorage.getItem("@Auth:user");
    
    return(
        <Container>
            <ContUser>
                {storageUser.toLowerCase()}
            </ContUser>
            
        </Container>
    )
}

export default Header;