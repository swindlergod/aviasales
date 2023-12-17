import React, { useEffect, useState } from "react";
import classes from './ticketsList.module.scss'
import Ticket from "./Ticket/ticket";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets, sortCheapest } from "../../store/ticketsReducer";

export default function TicketsList() {

    const ticket = useSelector(state => state.tickets.tickets)
    const filteredTicket = useSelector(state => state.tickets.filteredTickets)
    const loading = useSelector(state => state.tickets.loading)
    const count = useSelector(state => state.tickets.count)
    const filters = useSelector(state => state.filters.filters)
    const sort = useSelector(state => state.sort.sort)

    const dispatch = useDispatch()    

    const getCheapest = () => {
        dispatch({type: 'GET_CHEAPEST'})
        dispatch({type: 'GET_CHEAPEST2'})
    }

    const getFastest = () => {
        dispatch({type: 'GET_FASTEST'})
        dispatch({type: 'GET_FASTEST2'})
    }

    const getMore = () => {
        dispatch({type: 'GET_MORE'})
    }

    // const sortTickets = () => {
    //     if(sort === 'cheapest'){
    //         dispatch({type: 'SORT_CHEAPEST'})
    //         return filteredTicket
    //         // return filteredTicket.sort((a,b) => a.price - b.price)
    //     } else {
    //         return filteredTicket.sort((a,b) => a.segments[0].duration + a.segments[1].duration - b.segments[0].duration + b.segments[1].duration)
    //     }
    // }


    useEffect(() => {
        dispatch(getAllTickets())
    },[dispatch])

    return (
        <div className={classes.ticketsList}>
            <div className={classes.tabs}>
                <button className={classes.tabsButtons} onClick={getCheapest}>Самый дешевый</button>
                <button className={classes.tabsButtons} onClick={getFastest}>Самый быстрый</button>
            </div>
            {!loading && ticket.slice(0, count).map((tick) => (
              <Ticket key={"id" + Math.random().toString(16).slice(2)} {...tick}/>))}    
            <button className={classes.showMore} onClick={() => getMore()}> ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ! </button>           
            
        </div>
    )
}

 // // )) : ticket.slice(0, count).map((tick) => (
            // //     <Ticket key={"id" + Math.random().toString(16).slice(2)} {...tick}/>    
            // //   ))}
            // {/* {!loading && ticket.slice(0, count).map((tick) => (
            //   <Ticket key={"id" + Math.random().toString(16).slice(2)} {...tick}/>    
            // ))} */}