import React, { useCallback, useEffect, useState } from 'react'
import classes from './ticketsList.module.scss'
import Ticket from './Ticket/ticket'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTickets, getSearchId } from '../../store/ticketsReducer'
import { Spin } from 'antd'

export default function TicketsList() {
  const dispatch = useDispatch()
  const { tickets, loading } = useSelector((state) => state.tickets)
  const { filters } = useSelector((state) => state.filters)
  const { sort, tabs } = useSelector((state) => state.sort)
  const [initTickets, setTickets] = useState([])
  const [slicer, setSlicer] = useState(5)

  const actionHandler = (action) => {
    switch (action) {
      case 'cheapest':
        dispatch({ type: 'GET_CHEAPEST' })
        break
      case 'fastest':
        dispatch({ type: 'GET_FASTEST' })
        break
      case 'more':
        setSlicer(slicer + 5)
        break
      default:
        console.error('unavailable handle')
    }
  }

  const sortTickets = useCallback(
    (tickets) => {
      if (sort === 'fastest') {
        return tickets.sort(
          (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
        )
      }
      if (sort === 'cheapest') {
        return tickets.sort((a, b) => a.price - b.price)
      }
      return tickets
    },
    [sort]
  )

  const filtTickets = useCallback(
    (tickets) => {
      return tickets.filter((ticket) => {
        if (filters.includes('all')) {
          return true
        }
        if (
          filters.includes('without') &&
          ticket.segments[0].stops.length === 0 &&
          ticket.segments[1].stops.length === 0
        ) {
          return true
        }
        if (filters.includes('one') && ticket.segments[0].stops.length === 1 && ticket.segments[1].stops.length === 1) {
          return true
        }
        if (filters.includes('two') && ticket.segments[0].stops.length === 2 && ticket.segments[1].stops.length === 2) {
          return true
        }
        if (
          filters.includes('three') &&
          ticket.segments[0].stops.length === 3 &&
          ticket.segments[1].stops.length === 3
        ) {
          return true
        }
        return false
      })
    },
    [filters]
  )

  useEffect(() => {
    getSearchId()
      .then((id) => dispatch(getAllTickets(id)))
      .then(() => dispatch({ type: 'LOADING' }))
  }, [dispatch])

  useEffect(() => {
    setTickets(sortTickets(filtTickets(tickets)))
  }, [tickets, filtTickets, sortTickets])

  return (
    <div className={classes.ticketsList}>
      <div className={classes.tabs}>
        {tabs.map((tab) => {
          return (
            <button
              key={tab.id}
              className={`${classes.tabsButtons} ${sort === tab.value ? classes.activeButton : null}`}
              onClick={() => actionHandler(tab.value)}
            >
              {tab.name}
            </button>
          )
        })}
      </div>
      {loading && (
        <div className={classes.spin}>
          Загружаем еще больше билетов...
          <Spin />
        </div>
      )}
      {!initTickets.length && (
        <div className={classes.message}>Рейсов, подходящих под заданные фильтры, не найдено</div>
      )}
      {initTickets.slice(0, slicer).map((initTicket, index) => {
        return <Ticket key={index + Math.random().toString(32).slice(4)} {...initTicket} />
      })}
      {initTickets.length !== 0 && (
        <button className={classes.showMore} onClick={() => actionHandler('more')}>
          {' '}
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!{' '}
        </button>
      )}
    </div>
  )
}
