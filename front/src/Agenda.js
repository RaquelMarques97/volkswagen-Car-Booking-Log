import React, { Component } from 'react';
import ModalCtrl from './ModalCtrl';
import moment from 'moment';
import { ReactAgenda, ReactAgendaCtrl, Modal } from 'react-agenda';

const now = new Date();


const colors = {
  "color-5": 'rgb(162, 30, 77)'
}

const items = [];




export default class Agenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selected: [],
      cellHeight: (60 / 4),
      showModal: false,
      rowsPerHour: 1,
      numberOfDays: 7,
      startDate: new Date(),
    }
  }

  componentDidMount() {
    this.setState({ items })
  }

  componentWillReceiveProps(next, last) {
    if (next.items) {
      this.setState({ items: next.items })
    }
  }


  handleItemEdit = (item, openModal) => {
    if (item && openModal === true) {
      this.setState({ selected: [item] })
      return this._openModal();
    }
  }

  handleCellSelection = (item, _openModal) => {
    if (this.state.selected && this.state.selected[0] === item) {
      return this._openModal();
    }
    this.setState({ selected: [item] })
  }

  zoomIn = () => {
    const num = this.state.cellHeight + 15
    this.setState({ cellHeight: num })
  }

  zoomOut = () => {
    const num = this.state.cellHeight - 15
    this.setState({ cellHeight: num })
  }


  handleDateRangeChange = (startDate, endDate) => {
    this.setState({ startDate })
  }

  handleRangeSelection = (selected) => {
    this.setState({ selected: selected, showCtrl: true })
    this._openModal();
  }

  _openModal = () => {
    this.setState({ showModal: true })
  }
  _closeModal = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ showModal: false })
  }

  handleItemChange = (items, item) => {
    this.setState({ items })
  }

  handleItemSize = (items, item) => {
    this.setState({ items })
  }

  removeEvent = (items, item) => {
    this.setState({ items });
  }


  addNewEvent = (items, newItems) => {
    //console.log('items: ', items);
    //console.log('newItems: ', newItems);

    this.setState({ showModal: false, selected: [], items: newItems });
    this._closeModal();

    //this.handleFetch(this.state.items);
  }

  editEvent = (items, item) => {
    this.setState({ showModal: false, selected: [], items });
    this._closeModal();
  }

  changeView = (days, event) => {
    this.setState({ numberOfDays: days })
  }


  render() {

    var AgendaItem = function (props) {

      return <div style={{ display: 'block', position: 'relative', background: 'rgb(162, 30, 77)', color:'white',padding: '10px' }}>
          {props.item.name}||{props.item.car_plate}
        
        {/*<button onClick={() => props.edit(props.item)}> edit </button>*/}
      
    </div>
    

    }
    return (

      <div className="content-expanded ">

        <div className="control-buttons">
          <button className="button-control" style={{padding:'7px', background:'black', color:'white'}} onClick={this.zoomIn}>Zoom +<i className="zoom-plus-icon"></i> </button>
          <button className="button-control" style={{padding:'7px', background:'black', color:'white'}} onClick={this.zoomOut}>Zoom -<i className="zoom-minus-icon"></i> </button>
          <button className="button-control" style={{padding:'7px', background:'black', color:'white'}} onClick={this.changeView.bind(null, 7)}> {moment.duration(7, "days").humanize()}  </button>
          <button className="button-control" style={{padding:'7px', background:'black', color:'white'}} onClick={this.changeView.bind(null, 5)}> {moment.duration(5, "days").humanize()}  </button>
          <button className="button-control" style={{padding:'7px', background:'black', color:'white'}} onClick={this.changeView.bind(null, 3)}> {moment.duration(3, "days").humanize()}  </button>
          <button className="button-control" style={{padding:'7px', background:'black', color:'white'}} onClick={this.changeView.bind(null, 1)}> {moment.duration(1, "day").humanize()} </button>
          <button className="button-control" style={{padding:'7px', marginLeft:'25vw',marginTop:'30px', marginBottom:'30px', width:'200px', background:'rgb(162, 30, 77)', color:'white', fontWeight:'bold'}} onClick={this._openModal}>Book a car<i className="schedule-icon"></i> </button>
        </div>

        <ReactAgenda
          minDate={new Date(now.getFullYear(), now.getMonth() - 3)}
          maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
          startDate={this.state.startDate}
          startAtTime={8}
          endAtTime={23}
          cellHeight={this.state.cellHeight}
          items={this.props.data}
          numberOfDays={this.state.numberOfDays}
          headFormat={"ddd DD MMM"}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          helper={true}
          itemComponent={AgendaItem}
          view="calendar"
          autoScale={false}
          fixedHeader={true}
          onRangeSelection={this.handleRangeSelection.bind(this)}
          onChangeEvent={this.handleItemChange.bind(this)}
          onChangeDuration={this.handleItemSize.bind(this)}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
          onItemRemove={this.removeEvent.bind(this)}
          onDateRangeChange={this.handleDateRangeChange.bind(this)} />
        {
          this.state.showModal ? <Modal clickOutside={this._closeModal} >
            <div className="modal-content">
              {/*<ReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected} Addnew={this.addNewEvent} edit={this.editEvent}/>*/}

              <ModalCtrl items={this.state.items} selectedCells={this.state.selected} Addnew={this.addNewEvent} edit={this.editEvent}></ModalCtrl>
            </div>
          </Modal> : ''
        }
      </div>

    );
  }
}