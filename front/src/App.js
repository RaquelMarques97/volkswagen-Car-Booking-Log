import React, {Component} from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import Navbar from './Navbar';
import Booking from './Booking';
import Footer from './Footer';
import Trip from './Trip';
import TripKm from './TripKm';
import Homepage from './Homepage';
import ModalCtrl from './ModalCtrl';

//the data and details are the information coming from the database, 
//the data is the information that is going to be used in the agenda for the bookings and the listing of trips
//and the details is the rest of the information that we need from the database

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      details: []
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => {        
         const items = data.map(el => 
         ({
          _id: el.id,
          name: el.driver_name,
          startDateTime: new Date(el.start_date_time.split('00:00:00').join(el.start_time)),
          endDateTime: new Date(el.end_date_time.split('00:00:00').join(el.end_time)),
          classes: 'color-5',
          start_time: el.start_time,
          end_time: el.end_time,
          car_plate:el.car_plate
        }))
        const details = data.map(element => ({
          start_date_time:element.start_date_time,
          id: element.id,
          driver_name: element.driver_name,
          destination: element.destination,
          car_plate: element.car_plate,
          end_km: element.end_km,
          start_km: element.start_km,
          end_time: element.end_time,
          start_time: element.start_time
        }))
        this.setState({ 
          data: items,
          details: details 
        });
      })
  }
  
  render() {
    
    const { data, details } = this.state;
    const dataStart = [];
    const dataEnd = [];

    let verification = (i) => {
      
      const startkm = details[i].start_km;
      const endkm = details[i].end_km;
      if(!startkm){
        dataStart[i] = details[i];
      }else if(startkm && !endkm){
        dataEnd[i] = details[i];
      }
    }
    
    for (let i=0; i < details.length; i++) {
      verification(i);
    }
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={() => <Homepage data={data} />} />
          <Route path='/trip/start' component={() => <Trip details={dataStart}/>} />
          <Route path='/trip/end' component={() => <Trip details={dataEnd}/>} />
          <Route path='/trip' component={() => <Trip data={data} details={details}/>} />
          <Route path='/booking' component={() => <Booking data={data} />} />
          <Route 
            path='/tripkm/:id' 
            render={
              (props) => {
                const id = props.match.params.id;
                return <TripKm data={details} id={id} />
              }
            }
          />
          <Route 
            path='/info/:id' 
            render={
              (props) => {
                const id = props.match.params.id;
                return <ModalCtrl details={details} id={id} />
              }
            }
          />
        </Switch>       
      <Footer/>     
      </>
    );
  }
}

export default App;
