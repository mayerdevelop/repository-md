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

  
  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:vendedor");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setVendedor(storageUser);
      }
    };
    loadingStoreData();
  }, []);

  const menuFormat = async (menu) =>{
    let lRet = false
    try {
      const response = await api.get(`/menu/filter/${menu}`);
      let json = {}
     
      console.log(response.data)

  
    } catch (error) {
      console.log(error);
      alert('Erro na comunicação com a API, contate um administrador')
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
            setVendedor(res.cod_vendedor)
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
        signOut
      }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
