import React, { useEffect } from "react";
import Header from "../componentes/principal/header";
import Body from "../componentes/principal/body";
import styles from "../../assets/styles/Principal.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Principal(){

    useEffect(()=> {
        
        sessionStorage.removeItem('user');
    })

    return (

        <>
            <Header/>
            <Body/>
            
        </>
    

    );

}

export default Principal;