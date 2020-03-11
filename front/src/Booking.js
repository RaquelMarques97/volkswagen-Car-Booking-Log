import React from 'react';
import Agenda from './Agenda';
import './booking.css';

const Booking = ({ data }) => {
    return (
        <div className='booking-container'>
            <h1>CAR POOL BOOKING</h1>
            <Agenda data={data} />
        </div>
    )
}

export default Booking;