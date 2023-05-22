
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Chip, Divider, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Alert from '@mui/material/Alert';


export default function BookTicketForm({ show }) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [selectedTime, setSelectedTime] = React.useState(null);
    const [currentStep, setCurrentStep] = React.useState(1);
    const [selectedSeats, setSelectedSeats] = React.useState(new Set());
    const [clickedColumn, setClickedColumn] = React.useState('');
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [filterseats, setFilterseats] = React.useState();
    // selected date ans time**********************
    React.useEffect(() => {
        if (show.showTimes.length > 0) {
            setSelectedDate(show.showTimes[0].date);
        }
    }, [show.showTimes]);

    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
    };
    const tax = {
        serviceTax: 14,
        swachhBharatCess: 0.5,
        krishiKalyanCess: 0.5
    }
    // selected date ans time**********************
    // Open / Close form ***************************
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setCurrentStep(1);
        window.location.reload();
    };
    //  changes current sage data******************
    const handleSelectSeats = () => {
        if (!selectedDate || !selectedTime) {
            alert('Please select a date and time before booking.');
            return;
        }
        setCurrentStep(2);
    };
    const handleBook = () => {
        if (totalPrice <= 0) {
            alert('please selecte seats.');
            return;
        }
        const selectedSeatIds = Array.from(selectedSeats);
        setSelectedSeats(selectedSeatIds);
        setCurrentStep(3);
    };

    const handlePay = async () => {
        const shouldContinue = window.confirm('Would you like to continue?');
        if (shouldContinue) {
            alert('Payment successful! Seats booked.');
            setOpen(false)
            setCurrentStep(1);
            window.location.reload();
        } else {
            alert('Payment cancelled.');
            setOpen(false);
            setCurrentStep(1);
            window.location.reload();
        }

    };

    //  handle SelectS eats  to add seates data******************
    const renderSeats = (category, seats) => {
        const seatColors = {
            Platinum: 'platinum-seat',
            Gold: 'gold-seat',
            Silver: 'silver-seat'
        };

        const handleSeatSelection = (category, seatNumber) => {
            const seatId = `${category}-${seatNumber}`;
            const selectedSeat = seats.find((seat) => seat.seatNumber === seatNumber);

            if (selectedSeat.booked === 'N') {
                const updatedSelectedSeats = new Set(selectedSeats);

                if (updatedSelectedSeats.has(seatId)) {
                    updatedSelectedSeats.delete(seatId);
                } else {
                    updatedSelectedSeats.add(seatId);
                }

                setSelectedSeats(updatedSelectedSeats);
                calculateTotalPrice(updatedSelectedSeats);
            } else {
                alert('This seat is not available');
            }
        };

        const calculateTotalPrice = (selectedSeats) => {
            let total = 0;
            selectedSeats.forEach((seatId) => {
                const [category, seatNumber] = seatId.split('-');
                const packagePrice = show.seatPrices.find((price) => price.packageName === category)?.packagePrice || 0;
                total += packagePrice;
            });

            setTotalPrice(total);

        };

        const handleColumnClick = (category, seatNumber) => {
            const clickedColumnId = `${category}-${seatNumber}`;
            setClickedColumn(clickedColumnId);
        };

        return (
            <>
                {seats.map((seat) => (
                    <TableRow key={seat.seatNumber} >
                        <TableCell
                            className={`custom-table-cell ${clickedColumn === `${category}-${seat.seatNumber}` ? 'clicked' : ''}`}
                            onClick={() => handleColumnClick(category, seat.seatNumber)}
                        >
                            {seat.display === 'Y' ? (
                                <Paper
                                    elevation={0}
                                    className={`seat-square seat-box ${seatColors[category]} ${seat.booked === 'Y' ? 'booked' : 'not-booked'
                                        } ${selectedSeats.has(`${category}-${seat.seatNumber}`) ? 'selected' : ''}`}
                                    onClick={() => handleSeatSelection(category, seat.seatNumber)}
                                >
                                    <div
                                        className={`seat-content ${selectedSeats.has(`${category}-${seat.seatNumber}`) ? 'selected' : ''}`}
                                        style={{ backgroundImage: selectedSeats.has(`${category}-${seat.seatNumber}`) ? `url(path/to/selected-image.jpg)` : `url(path/to/not-selected-image.jpg)` }}
                                    >
                                        <span className="seat-number">{seat.seatNumber}</span>
                                    </div>
                                </Paper>
                            ) : (
                                ''
                            )}
                        </TableCell>


                    </TableRow>
                ))}

            </>
        );
    };
    //  handle SelectS eats  to add seates data******************
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} color="error" className="book-now-button">
                Book Now
            </Button>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title" maxWidth="xl">
            
                <DialogTitle id="responsive-dialog-title" style={{ textAlign: 'center',marginTop:'10px', fontWeight: 'bold'}}>{"BOOK  TICKET"}</DialogTitle>
                <DialogContent >
                <Alert variant="outlined" icon={false} style={{ borderColor: 'black' }}>
                    {/* Step 1: Select Date and Time */}
                    {currentStep === 1 && (
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                                        <Typography variant="h6" style={{ textAlign: 'center',fontWeight: 'bold'}}>
                                            Show {show.showNumber} Running in {show.auditorium}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                {show.showTimes.slice(0, 3).map((showTime) => (
                                    <Grid item xs={12} sm={4} key={showTime.date}>
                                        <Paper
                                            elevation={selectedDate === showTime.date ? 6 : 3}
                                            sx={{
                                                padding: 1,
                                                marginBottom: 2,
                                                cursor: 'pointer',
                                                backgroundColor: selectedDate === showTime.date ? 'red' : 'white',
                                                textAlign: 'center',
                                                color: selectedDate === showTime.date ? 'white' : 'black',
                                            }}
                                            onClick={() => handleDateSelection(showTime.date)} >
                                            <Typography variant="h6" sx={{ fontSize: '0.75rem' }}>
                                                {showTime.day}
                                            </Typography>
                                            <Typography variant="h5" sx={{ fontSize: '1.0rem' }}>
                                                {showTime.date}
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontSize: '0.75rem' }}>
                                                {showTime.month}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                            {selectedDate && (
                                <Grid container spacing={2}>
                                    {show.showTimes
                                        .find((showTime) => showTime.date === selectedDate)
                                        .Time.map((time) => (
                                            <Grid item xs={12} sm={3} key={Object.values(time)[0]}>
                                                <Paper
                                                    elevation={3}
                                                    sx={{
                                                        padding: 2,
                                                        marginBottom: 2,
                                                        textAlign: 'center',
                                                        backgroundColor: selectedTime === Object.values(time)[0] ? 'red' : 'white',
                                                        cursor: 'pointer',
                                                        color: selectedTime === Object.values(time)[0] ? 'white' : 'black',
                                                    }}
                                                    onClick={() => handleTimeSelection(Object.values(time)[0])}
                                                >
                                                    <Typography variant="body1">
                                                        {selectedTime === Object.values(time)[0] ? Object.values(time)[0] : Object.values(time)[0]}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        ))}
                                </Grid>)}
                            <Grid container spacing={2}>
                                {Object.entries(show.seatPrices).map(([category, shows]) => (
                                    <Grid item xs={12} sm={4} key={category}>
                                        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                                            <Typography variant="h6">{shows.packageName}</Typography>
                                            <Typography variant="body1">Price: {shows.packagePrice}</Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                            {/* Buttons */}
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Button variant="contained" color="error" sx={{ textAlign: 'left' }} onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" sx={{ textAlign: 'right' }} color="primary" onClick={handleSelectSeats} autoFocus>
                                        Book
                                    </Button>
                                </Grid>
                            </Grid>
                            
                        </>
                    )}
                    {/* Step 2: select booking seats */}
                    {currentStep === 2 && (
                        <>
                            <div>
                                <Table className="seats-table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Seats
                                            </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.entries(show.seats).map(([category, seats]) => (
                                            <TableRow key={category} >
                                                <TableCell>
                                                    <div className={`seat-category ${category.toLowerCase()}`}>
                                                        {renderSeats(category, seats)}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <br />
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <Button variant="contained" color="error" sx={{ textAlign: 'left' }} onClick={handleClose} >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Paper elevation={5} sx={{ padding: 2, backgroundColor: 'red', width: 150 }}>
                                            <div>
                                                <span style={{ fontWeight: 'bold', fontSize: 'large', color: 'white' }}>Total : RS. {totalPrice}</span >

                                            </div>
                                        </Paper>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" sx={{ textAlign: 'right' }} color="primary" onClick={handleBook} autoFocus>
                                            Generate Bill - Rs: {totalPrice}
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ pb: 2 }} />
                                <div style={{ textAlign: 'center',marginTop:'10px' }}>
                                    <Chip label="Available" variant="outlined" />
                                    &nbsp;&nbsp;&nbsp;&nbsp;<Chip label="sold" />&nbsp;&nbsp;
                                    &nbsp;&nbsp;<Chip label="Selected" color="success" />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Step 3: selected booking details */}
                    {currentStep === 3 && (
                        <>
                            <div>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Item</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Array.from(selectedSeats).map((seatId) => {
                                            const [category, seatNumber] = seatId.split('-');
                                            const selectedSeat = show.seats[category].find((seat) => seat.seatNumber === seatNumber);
                                            const packagePrice = show.seatPrices.find((price) => price.packageName === category)?.packagePrice || 0;
                                            const total = packagePrice;

                                            return (
                                                <TableRow key={seatId}>
                                                    <TableCell>{`${category} - ${seatNumber}`}</TableCell>
                                                    <TableCell align="right">1</TableCell>
                                                    <TableCell align="right">{packagePrice}</TableCell>
                                                    <TableCell align="right">{total}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {/* Add rows for other items */}
                                        <TableRow>
                                            <TableCell colSpan={3} align="right">Subtotal</TableCell>
                                            <TableCell align="right">{totalPrice}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={3} align="right">Service Tax ({tax.serviceTax}%)</TableCell>
                                            <TableCell align="right">{(totalPrice * (tax.serviceTax / 100)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={3} align="right">Swachh Bharat Cess ({tax.swachhBharatCess}%)</TableCell>
                                            <TableCell align="right">{(totalPrice * (tax.swachhBharatCess / 100)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={3} align="right">Krishi Kalyan Cess ({tax.krishiKalyanCess}%)</TableCell>
                                            <TableCell align="right">{(totalPrice * (tax.krishiKalyanCess / 100)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={3} align="right">Total</TableCell>
                                            <TableCell align="right">{(totalPrice + (totalPrice * (tax.serviceTax / 100)) + (totalPrice * (tax.swachhBharatCess / 100)) + (totalPrice * (tax.krishiKalyanCess / 100))).toFixed(2)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <br />
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <Button variant="contained" color="error" sx={{ textAlign: 'left' }} onClick={handleClose}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" sx={{ textAlign: 'right' }} color="primary" onClick={handlePay} autoFocus>
                                            PAY
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </>
                        )}
                    </Alert>
                </DialogContent>
            </Dialog>
        </div>
    );
}
