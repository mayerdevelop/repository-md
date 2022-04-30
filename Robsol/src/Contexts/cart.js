import React, { createContext, useState} from 'react'

export const CartContext = createContext({})

function CartProvider({children}){

    const [cart, setCart] = useState([]);
    const [visiblePrd, setVisiblePrd] = useState(false);
    const[vlrTotalCart, setVlrTotalCart] = useState(0)

    function addCart(cartReceive){
        setCart(cartReceive)
    };

    function visibleCart(receive){
        setVisiblePrd(receive)
    };

    function totalCart(receive){
        setVlrTotalCart(receive)
    };

    return(
        <CartContext.Provider value={{addCart,cart,visibleCart,visiblePrd,totalCart,vlrTotalCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;