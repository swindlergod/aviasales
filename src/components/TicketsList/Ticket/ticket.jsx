import React from "react";
import classes from './ticket.module.scss'
import moment from "moment";

export default function Ticket(ticket) {

    const stops1 = ticket.segments[0].stops.join(' ').split(' ').join(', ')
    const stops2 = ticket.segments[1].stops.join(' ').split(' ').join(', ')
    const stopsText1 = ticket.segments[0].stops.length === 0 ? ' ПЕРЕСАДОК' : ticket.segments[0].stops.length === 1 ? ' ПЕРЕСАДКА' : ' ПЕРЕСАДКИ'
    const stopsText2 = ticket.segments[1].stops.length === 0 ? ' ПЕРЕСАДОК' : ticket.segments[1].stops.length === 1 ? ' ПЕРЕСАДКА' : ' ПЕРЕСАДКИ'

    const departureTime = (date) => {
        return moment(date).format('hh:mm')
      }

    const destinationTime = (current, duration) => {
        return moment(current).add(duration, 'minutes').format('HH:mm')
      }

    const travelTime = (duration) => {
        const hours = Math.trunc(duration / 60)
        const minutes = duration % 60
        return `${hours}ч ${minutes}м`
    }

    return (
        <div className={classes.ticket}>
            <div className={classes.firstLine}>
                <div className={classes.price}>{ticket.price} P</div>
                <img src={`https://pics.avs.io/99/36/${ticket.carrier}.png`} alt="s7"/>
            </div>

            <div className={classes.lines}>
                <div>
                    <div className={classes.contentTitle}>{ticket.segments[0].origin} - {ticket.segments[0].destination}</div>
                    <div className={classes.content}>{departureTime(ticket.segments[0].date)} - {destinationTime(ticket.segments[0].date)}</div> 
                </div>
                
                <div>
                    <div className={classes.contentTitle}>В ПУТИ</div>
                    <div className={classes.content}>{travelTime(ticket.segments[0].duration)}</div>
                </div>

                <div>
                    <div className={classes.contentTitle}>{ticket.segments[0].stops.length}{stopsText1}</div>
                    <div className={classes.content}>{stops1}</div>
                </div>                
            </div>

            <div className={classes.lines}>
                <div>
                    <div className={classes.contentTitle}>{ticket.segments[1].origin} - {ticket.segments[1].destination}</div>
                    <div className={classes.content}>{departureTime(ticket.segments[1].date)} - {destinationTime(ticket.segments[1].date)}</div> 
                </div>
                
                <div>
                    <div className={classes.contentTitle}>В ПУТИ</div>
                    <div className={classes.content}>{travelTime(ticket.segments[1].duration)}</div>
                </div>

                <div>
                    <div className={classes.contentTitle}>{ticket.segments[1].stops.length}{stopsText2}</div>
                    <div className={classes.content}>{stops2}</div>
                </div>                
            </div>
        </div>
    )
}