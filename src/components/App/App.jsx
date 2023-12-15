import React from "react";
import classes from './App.module.scss'
import logo from '../../images/Logo.svg'
import Filters from "../Filters/filters";
import TicketsList from "../TicketsList/ticketsList";

export default function App() {

    return (
        <>
        <img src={logo} alt="logo" className={classes.logo}/>
        <div className={classes.main}>
        <Filters />
        <TicketsList />
        </div>
        </>
    )
}