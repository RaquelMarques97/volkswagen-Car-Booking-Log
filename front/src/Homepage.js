import React from 'react';
import { Link } from "react-router-dom";
import './homepage.css';


const Homepage = ({ data }) => {
    return (
        <div class='home'>
            <h1 class='home_title'>CAR POOL LOG</h1>
            <div class='home'>
                <nav>
                    <ul class='home_list'>
                        <div>
                            <li>
                                <Link class='home_link' to='/booking'>Booking</Link>
                            </li>
                            <li>
                                <Link class='home_link' to='/trip'>Trips Log</Link>
                            </li>
                        </div>
                        <div>
                            <li>
                                <Link class='home_link' to='/trip/start'>Start Trip</Link>
                            </li>
                            <li>
                                <Link class='home_link' to='/trip/end'>End Trip</Link>
                            </li>

                        </div>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Homepage;