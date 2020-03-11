const connection = require('../db/config');

const Record = {};

// get list of all projects
Record.getAllRecords = (callback) => {
	connection.query(
		`
			SELECT * FROM records
		`, (err, results) => {
		callback(err, results);
	});
};


//create new Booking - insert info in records table
Record.postBooking = (recordInfo, callback) => {
	connection.query(
		`INSERT INTO records (
			book_date,
			start_date_time,
			start_time,
			end_date_time,
			end_time,
			destination,
			driver_name,
			car_plate
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
		[
			recordInfo.book_date,
			recordInfo.start_date_time,
			recordInfo.start_time,
			recordInfo.end_date_time,
            recordInfo.end_time,
            recordInfo.destination,
            recordInfo.driver_name,
            recordInfo.car_plate
		],
		(err, results, fields) => {
			callback(err, results, fields);
		}
	);
};


//update start trip - insert info in records table
Record.updateStartTrip = (recordInfo, callback) => {
	connection.query(
		`UPDATE records SET start_km = ? WHERE id = ?`,
		[
			recordInfo.start_km,
			recordInfo.id
            
		],
		(err, results, fields) => {
			callback(err, results, fields);
		}
	);
};


//update end trip - insert info in records table
Record.updateEndTrip = (recordInfo, callback) => {
	connection.query(
		`UPDATE records SET end_km = ? WHERE id = ?`,
		[
			recordInfo.end_km,
			recordInfo.id
            
		],
		(err, results, fields) => {
			callback(err, results, fields);
		}
	);
};

// DELETE record
/*Record.deleteRecord = (id, callback) => {
	connection.query(
		`DELETE FROM records WHERE id=?`,
		id,
		(err, results, fields) => {
			callback(err, results, fields);
		}
	);
};*/

module.exports = Record;