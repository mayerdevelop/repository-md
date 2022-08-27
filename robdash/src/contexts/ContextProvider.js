import React, { createContext, useEffect, useContext, useState } from 'react';
import api from '../services/api';

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
    menu ='ewfew'
    let lRet = false
    try {
      const response = await api.get(`/MenusPrt/?CODIGOMENU=${menu}`);
      let json = {}
      
      /*
      response.data.map(function(element){
        json = {
          title: element.label,
          links: element.subItems.map(function(element){
            return {
              name: element.label.toLowerCase()
            }
          })
        }
      })
      */
     
      console.log(response.data+'tst')

  
    } catch (error) {
      console.log(error);
      alert('Erro na comunicação com a API, contate um administrador')
    }
  
    /*
  {
    title: 'Home',
    links: [
      {
        name: 'dashboard',
        icon: <FiShoppingBag />,
      },
    ],
  },
    */
  
  return lRet
  }
  


  const signIn = async ({ login, password }) => {
    try {
      const response = await api.post("/PRTL001", { USUARIO: login, SENHA: password });
      const res = response.data.statusrequest[0]

      if(res.code === '#200'){

        const retMenu = await menuFormat(res.menu_acesso)

        if(retMenu){
          localStorage.setItem("@Auth:vendedor", res.cod_vendedor);
          localStorage.setItem("@Auth:nomeuser", res.nome_usuario);
          localStorage.setItem("@Auth:token", res.user_token);
          setVendedor(res.cod_vendedor)
        }

      }else{
        if(!!res.Cod_Usuario){
          alert(JSON.stringify(res.Cod_Usuario))
        }
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
