import React, { createContext, useEffect, useContext, useState } from 'react';
import {api, apilocal} from '../services/api';


const StateContext = createContext();

const initialState = {
  userProfile: false,
};


export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [vendedor, setVendedor] = useState(null);
  const [menu, setMenu] = useState([]);

  
  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:vendedor");
      const storageToken = localStorage.getItem("@Auth:token");

      const color = localStorage.getItem('colorMode')
      const theme = localStorage.getItem('themeMode')

      localStorage.setItem('colorMode',color)
      localStorage.setItem('themeMode',theme)


      if (storageUser && storageToken) {
        setVendedor(storageUser);
      }
    };
    loadingStoreData();
  }, []);

  const menuFormat = async (menu) =>{
    let lRet = false
    try {
      const response = await apilocal.get(`/menu/filter/${menu}`);

      if(response.data.status === 'sucess'){
        let arrMnu = []
        lRet = true

        response.data.menu.map(function(menu){
          arrMnu.push({
            title: menu.title,
            links: menu.links.map(function(link){
              return {name: link.name}
            })
          })
        })

        setMenu(arrMnu)
        localStorage.setItem('@menu',JSON.stringify(arrMnu))

      }else {
        alert('Nao foi possivel validar o menu de acesso')
        lRet = false
      }

    } catch (error) {
      console.log(error);
      alert('Erro na comunicação com a API, contate um administrador')
      lRet = false
    }
  
  return lRet
  }

  const tokenAuth = async (token) =>{
    let ret = ''
    try {
      const response = await apilocal.get(`/token/auth/${token}`);

      if(response.data.status === 'sucess'){
        ret = response.data.menu

      }else{
        ret = response.data.status
        alert(response.data.name)
      }

    }catch(error){
      ret = 'error'
      console.log(error)
    }

    return ret
  }
  


  const signIn = async ({ login, password }) => {
    try {
      const response = await apilocal.post("/loginteste/authlogin",{user: login, pass: password});

      if(response.data.status === 'sucess'){
        const resToken = await tokenAuth(response.data.token)

        if(resToken !== 'error'){
          const retMenu = await menuFormat(resToken)

          if(retMenu){
            localStorage.setItem("@Auth:vendedor", response.data.user);
            localStorage.setItem("@Auth:nomeuser", response.data.name);
            localStorage.setItem("@Auth:token", response.data.token);
            setVendedor(response.data.user)
          }
        }

      }else{
        alert(response.data.name)
      }

    } catch (error) {
      console.log(error);
      alert('Erro na comunicação com a API, contate um administrador')
    }
  };

  const signOut = () => {
    
    localStorage.clear();
    setVendedor(null);

    localStorage.setItem('colorMode',currentColor)
    localStorage.setItem('themeMode',currentMode)

    
    return <Navigate to="/" />;
  };

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    <StateContext.Provider value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        vendedor,
        signed: !!vendedor,
        signIn,
        signOut,
        menu
      }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
