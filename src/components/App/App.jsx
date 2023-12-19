import React from 'react'

import logo from '../../images/Logo.svg'
import Filters from '../Filters/filters'
import TicketsList from '../TicketsList/ticketsList'

import classes from './App.module.scss'

export default function App() {
  return (
    <>
      <img src={logo} alt="logo" className={classes.logo} />
      <div className={classes.main}>
        <Filters />
        <TicketsList />
      </div>
    </>
  )
}
