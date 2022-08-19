import React, {useState} from 'react'
import { Container, Content, ContLogo } from './styles'
import { FaHome, FaWpforms, FaChartBar, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import { MdClose, MdMenu } from 'react-icons/md';

import logo from '../../assets/logo.svg'
import SidebarItem from '../SidebarItem'

const Aside = () => {

    const [toggleMenuIsOpened, setToggleMenuIsOpened ] = useState(false);

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    }

  return (
    <Container>
        <ContLogo>
            <a href="/home"><img src={logo} className="logo-Home"/></a>
        </ContLogo>
        
        <Content>
            <SidebarItem Icon={FaHome} Text="Home" />
            <SidebarItem Icon={FaChartBar} Text="Financeiro" />
            <SidebarItem Icon={FaWpforms} Text="Formulários" />
            <SidebarItem Icon={FaInfoCircle} Text="Mural de Informações" />
            <SidebarItem Icon={FaSignOutAlt} Text="Sair" />
        </Content>
    </Container>
  )
}

export default Aside