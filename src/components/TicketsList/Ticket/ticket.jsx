import React from 'react'
import moment from 'moment'

import classes from './ticket.module.scss'

export default function Ticket(ticket) {
  const { segments, price, carrier } = ticket
  const stops1 = segments[0].stops.join(' ').split(' ').join(', ')
  const stops2 = segments[1].stops.join(' ').split(' ').join(', ')
  const stopsText1 =
    segments[0].stops.length === 0 ? ' ПЕРЕСАДОК' : segments[0].stops.length === 1 ? ' ПЕРЕСАДКА' : ' ПЕРЕСАДКИ'
  const stopsText2 =
    segments[1].stops.length === 0 ? ' ПЕРЕСАДОК' : segments[1].stops.length === 1 ? ' ПЕРЕСАДКА' : ' ПЕРЕСАДКИ'

  const departureTime = (date) => moment(date).format('hh:mm')

  const destinationTime = (current, duration) => moment(current).add(duration, 'minutes').format('HH:mm')

  const travelTime = (duration) => {
    const hours = Math.trunc(duration / 60)
    const minutes = duration % 60
    return `${hours}ч ${minutes}м`
  }

  return (
    <div className={classes.ticket}>
      <div className={classes.firstLine}>
        <div className={classes.price}>{price} P</div>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="s7" />
      </div>

      <div className={classes.lines}>
        <div>
          <div className={classes.contentTitle}>
            {segments[0].origin} - {segments[0].destination}
          </div>
          <div className={classes.content}>
            {departureTime(segments[0].date)} - {destinationTime(segments[0].date)}
          </div>
        </div>

        <div>
          <div className={classes.contentTitle}>В ПУТИ</div>
          <div className={classes.content}>{travelTime(segments[0].duration)}</div>
        </div>

        <div>
          <div className={classes.contentTitle}>
            {segments[0].stops.length}
            {stopsText1}
          </div>
          <div className={classes.content}>{stops1}</div>
        </div>
      </div>

      <div className={classes.lines}>
        <div>
          <div className={classes.contentTitle}>
            {segments[1].origin} - {segments[1].destination}
          </div>
          <div className={classes.content}>
            {departureTime(segments[1].date)} - {destinationTime(segments[1].date)}
          </div>
        </div>

        <div>
          <div className={classes.contentTitle}>В ПУТИ</div>
          <div className={classes.content}>{travelTime(segments[1].duration)}</div>
        </div>

        <div>
          <div className={classes.contentTitle}>
            {segments[1].stops.length}
            {stopsText2}
          </div>
          <div className={classes.content}>{stops2}</div>
        </div>
      </div>
    </div>
  )
}
