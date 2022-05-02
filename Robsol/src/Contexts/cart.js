import React, { createContext, useState} from 'react'

export const CartContext = createContext({})

function CartProvider({children}){

    const [cart, setCart] = useState([]);
    const [vlrTotalCart, setVlrTotalCart] = useState(0)
    const [qtdTotalCart, setQtdTotalCart] = useState(0)

    const [dataUser,setDataUser] = useState();
    const [cliente, setCliente] = useState([])

    function addCart(cartReceive){
        setCart(cartReceive)
    };


    function totalCart(receive){
        setVlrTotalCart(receive)
    };

    function quantCart(receive){
        setQtdTotalCart(receive)
    };

    function setCli(receive){
        setCliente(receive)
    };

    function setUserData(receive){
        setDataUser(receive)
    };


    return(
        <CartContext.Provider value={{
            addCart,cart,
            totalCart,vlrTotalCart,
            setCli,cliente,
            quantCart,qtdTotalCart,
            setUserData,dataUser
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;