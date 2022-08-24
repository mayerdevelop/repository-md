import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Sidebar, ThemeSettings } from './components';
import * as pages from './pages';

import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { setCurrentColor, 
    setCurrentMode, 
    currentMode, 
    activeMenu, 
    currentColor, 
    themeSettings, 
    setThemeSettings,
    signed
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');

    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
            
          </div>

          {signed && activeMenu
            ? <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white"><Sidebar /></div>
            : <div className="w-0 dark:bg-secondary-dark-bg"><Sidebar /></div>
          }

          <div className={signed && activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full'
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'
            }
          >
            { signed &&<div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full "><Navbar /></div>}
            {themeSettings && (<ThemeSettings />)}
            { signed ?
            
              <Routes>
                <Route path="*" element={(<pages.Dashboard />)} />
                <Route path="/dashboard" element={(<pages.Dashboard />)} />
                <Route path="/clientes" element={<pages.Clientes />} />
                <Route path="/pedidos" element={<pages.Pedidos />} />
                <Route path="/line" element={<pages.Line />} />
                <Route path="/area" element={<pages.Area />} />
                <Route path="/bar" element={<pages.Bar />} />
                <Route path="/pie" element={<pages.Pie />} />
                <Route path="/financial" element={<pages.Financial />} />
                <Route path="/color-mapping" element={<pages.ColorMapping />} />
                <Route path="/pyramid" element={<pages.Pyramid />} />
                <Route path="/stacked" element={<pages.Stacked />} />
              </Routes>
            : 
              <Routes><Route path="*" element={(<pages.Login />)} /></Routes>
            }

          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
