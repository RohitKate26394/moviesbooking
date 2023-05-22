import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent, Button, Alert } from '@mui/material';
import './../seatsDashboard.css';
import BookTicketForm from '../Booking/BookTicketForm';


const SeatsDashboard = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Seats.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const renderSeats = (category, seats) => {
    const seatColors = {
      Platinum: 'platinum-seat',
      Gold: 'gold-seat',
      Silver: 'silver-seat'
    };

    return seats.map((seat) => (
      <TableRow key={seat.seatNumber} >
        <TableCell className="custom-table-cell">
            {seat.display === "Y" ?
            <div
            className={`seat-square seat-box ${seatColors[category]} ${
              seat.booked === 'Y' ? 'booked' : 'not-booked'
            }`} >
            <div className="seat-content">
               <span className="seat-number">{ seat.seatNumber}</span>
            </div>
          </div>:"" }
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div >
      <div className="card-container">
        {shows.map((show) => (
          <Card key={show.showNumber} className="show-card" style={{ border: '1px solid black' }}>
           
              <CardContent>
                <div className="show-info">
                  <Typography variant="h6" style={{color: 'bold'}}>
                    Show {show.showNumber} Running in {show.auditorium}:
                  </Typography>
                  <BookTicketForm show={show}/>
                </div>
                <Typography variant="subtitle1" >All Seats:</Typography>
                <Table className="seats-table">
                  <TableHead >
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>Seats</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(show.seats).map(([category, seats]) => (
                      <TableRow key={category}  >
                        <TableCell>{category}</TableCell>
                        <TableCell  >
                          <div className={`seat-category ${category.toLowerCase()}`}>
                            {renderSeats(category, seats)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
           
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SeatsDashboard;
