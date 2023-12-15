import React, { useEffect } from "react";
import classes from './ticketsList.module.scss'
import Ticket from "./Ticket/ticket";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../../store/ticketsReducer";

export default function TicketsList() {

    const ticket = useSelector(state => state.tickets.tickets)
    const filteredTicket = useSelector(state => state.tickets.copyTickets)
    const loading = useSelector(state => state.tickets.loading)
    const count = useSelector(state => state.tickets.count)
    const filters = useSelector(state => state.filters.filters)

    const dispatch = useDispatch()    

    const getCheapest = () => {
        dispatch({type: 'GET_CHEAPEST'})
    }

    const getFastest = () => {
        dispatch({type: 'GET_FASTEST'})
    }

    const getMore = () => {
        dispatch({type: 'GET_MORE'})
    }


    useEffect(() => {
        dispatch(getAllTickets())
    }, [dispatch])

    return (
        <div className={classes.ticketsList}>
            <div className={classes.tabs}>
                <button className={classes.tabsButtons} onClick={() => getCheapest()}>Самый дешевый</button>
                <button className={classes.tabsButtons} onClick={() => getFastest()}>Самый быстрый</button>
            </div>
            {!loading && filteredTicket.length ? filteredTicket.slice(0, count).map((tick) => (
              <Ticket key={"id" + Math.random().toString(16).slice(2)} {...tick}/>    
            )) : ticket.slice(0, count).map((tick) => (
                <Ticket key={"id" + Math.random().toString(16).slice(2)} {...tick}/>    
              ))}
            {/* {!loading && ticket.slice(0, count).map((tick) => (
              <Ticket key={"id" + Math.random().toString(16).slice(2)} {...tick}/>    
            ))} */}
            <button className={classes.showMore} onClick={() => getMore()}> ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ! </button>           
            
        </div>
    )
}