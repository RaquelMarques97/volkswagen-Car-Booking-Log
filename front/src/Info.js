import React,{Component} from 'react';
import './Info.css';

const items = [];

class Info extends Component {
    constructor(props){
        super(props);
        this.state = {            
                name:'',
                destination:'',
                car_plate:'',
                start_date:'',
                end_date: '',
                start_time:'',
                end_time: '',
                items:[]
                
            
        }

        this.infoInput = this.infoInput.bind(this); 
    }

    componentDidMount() {
        this.setState({ items })
      }
   
    infoInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
     
    }
    
    
    fetchNew = () => {
        console.log('estamos dentro da handleFetch e isto é o que recebemos: ');
        fetch('http://localhost:5000/',
          {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(this.state),
          })
          .then(res => res.json());  
    }
    


      
    
    render() {
       
        const item = this.state;
        return (
            <div class="info_container">
   	  
                <form class="info" onSubmit={this.infoInput}>
                    <h2>BOOK A CAR</h2>
                    <div class='plate'>
                    <select type='text' name="car_plate" value={item.car_plate} onChange={this.infoInput} required>
                        <option id='1' value='no plate'>Choose a car plate</option>
                        <option id='1' value='72-VZ-96'>72-VZ-96</option>
                        <option id='2' value='73-VZ-96'>73-VZ-96</option>
                        <option id='3' value='74-VZ-96'>74-VZ-96</option>
                        <option id='4' value='75-VZ-96'>75-VZ-96</option>
                        </select>
                    </div>
                  
                    <div class='event'>
                        <div class='name-destination'>
                            <div>    
                                <h4>Driver name:</h4>
                                <input class='name'type="text" name="name" value={item.name} onChange={this.infoInput} required/>
                            </div>
                            <div>
                                <h4>Destination:</h4>
                                <input class='destination' type="text" name="destination" value={item.destination} onChange={this.infoInput} required />
                            </div>
                        </div>
                    </div>
                    <div class='start'>
                        <label>Start Date </label>
                        <input type="date" name="start_date" value={item.start_date} onChange={this.infoInput} required></input> 
                        <label>Start time </label>
                        <input type="time" name="start_time" value={item.start_time} onChange={this.infoInput} required></input> 
                    </div>
                    <div class='end'>
                        <label>End Date</label>
                        <input type="date" name="end_date" value={item.end_date} onChange={this.infoInput} required></input>
                        <label>End time </label>
                        <input type="time" name="end_time" value={item.end_time} onChange={this.infoInput} required></input> 
                    </div>
                   <div class='modal_save'>
                        <button  item={item} type='submit' value='Submit' onClick={this.fetchNew}>SAVE</button>
                    </div>
                    
                </form>

            </div>

        )
    }
}


export default Info;