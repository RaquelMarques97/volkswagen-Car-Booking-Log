import React from 'react';
import Moment from 'react-moment';
import { Link } from "react-router-dom";

import './triplog.css';

const TripCard = ({ trip }) => {
       return(
        <>
            <div className="triplog_card">
                <div className="triplog_destination_info">
                    <div className="triplog_destination_bold">
                        Driver:
                    </div>
                    {trip.driver_name}
                </div>
                <div className="triplog_destination_info">
                    <div className="triplog_destination_bold">
                        Reservation date:
                    </div> 
                    <Moment format='DD/MMM/YYYY'>
                        {trip.start_date_time}
                    </Moment>
                </div>
                <div className="triplog_destination_info">
                    <div className="triplog_destination_bold">    
                        Destination: 
                    </div>
                    {trip.destination}
                </div>
                <div className="triplog_start_info">
                    <div className="triplog_start_bold">
                        Start:
                    </div>
                    {trip.start_time.slice(0, -3)}
                </div>
                <div className="triplog_end_info">
                    <div className="triplog_end_bold">
                        End:
                    </div>
                    {trip.end_time.slice(0, -3)}
                </div>
                <div className="triplog_destination_info">
                    <div className="triplog_destination_bold">    
                        Car Plate: 
                    </div>
                    {trip.car_plate}
                   </div>
                   <div className="triplog_destination_info">
                    <div style={{fontWeight:'bold', color:'black'}} className="triplog_startkm">    
                        Start Km: 
                    </div>
                    {trip.start_km}
                   </div>
                   <div className="triplog_destination_info">
                       <div style={{fontWeight:'bold', color:'black'}} className="triplog_endkm">    
                        End Km: 
                    </div>
                    {trip.end_km}
                </div>

                <button>
                    <Link to={`/tripkm/${trip.id}`} >Go</Link>
                </button>
            </div>
        </>
    )
}

export default TripCard;