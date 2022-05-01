import React, { createContext, useState} from 'react'

export const CartContext = createContext({})

function CartProvider({children}){

    const [cart, setCart] = useState([]);
    const [visiblePrd, setVisiblePrd] = useState(false);
    const[vlrTotalCart, setVlrTotalCart] = useState(0)
    const[cliente, setCliente] = useState([])

    function addCart(cartReceive){
        setCart(cartReceive)
    };

    function visibleCart(receive){
        setVisiblePrd(receive)
    };

    function totalCart(receive){
        setVlrTotalCart(receive)
    };

    function setCli(receive){
        setCliente(receive)
    };


    return(
        <CartContext.Provider value={{
            addCart,cart,
            visibleCart,visiblePrd,
            totalCart,vlrTotalCart,
            setCli,cliente
            
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;