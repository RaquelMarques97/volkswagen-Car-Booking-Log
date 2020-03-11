import React, { Component } from 'react';
import TripCard from './TripCard';
import './triplog.css';


const details = [];

export default class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            selectedDriver: 'ALL'
        }
    }


    changeDriver = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    tripsList = () => {
        if (this.state.selectedDriver === 'ALL') {
            return (this.props.details.sort().map(trip => <TripCard trip={trip} key={trip.id} />)
            )

        } else {
            return (this.props.details.filter(el => {
                return el.driver_name === this.state.selectedDriver
            })
                .sort().map(trip => <TripCard trip={trip} key={trip.id} />)
            )
        }
    }

    render() {

        return (

            <>

                <h1 style={{padding:'20px'}} class="triplog_title">Trips log</h1>
                <div class="triplog_content">
                    <div style={{padding:'20px'}} class="triplog_select">
                        <label style={{fontSize:'20px', fontWeight:'bold'}}>Choose a driver:</label>
                        <select class='driver_select'style={{textAlign:'center', width:'200px'}}onChange={this.changeDriver} defaultValue='ALL' name="selectedDriver" >
                            <option id="driver" value='ALL'>ALL</option>
                            {[...new Set(this.props.details
                                .map(el => el.driver_name))].sort().map((driver =>
                                    <option id="driver" value={driver}>{driver}</option>))}

                        </select>
                    </div>
                    {this.tripsList()}

                    </div>
            </>
        );

    }

}
