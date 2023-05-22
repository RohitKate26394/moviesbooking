import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookTicketForm from './BookTicketForm';

test('renders "Book Now" button', () => {
  render(<BookTicketForm />);
  const bookNowButton = screen.getByText('Book Now');
  expect(bookNowButton).toBeInTheDocument();
});

test('opens the dialog when "Book Now" button is clicked', () => {
  render(<BookTicketForm  />);
  const bookNowButton = screen.getByText('Book Now');
  fireEvent.click(bookNowButton);
  const dialogTitle = screen.getByText('BOOK MOVIES TICKET');
  expect(dialogTitle).toBeInTheDocument();
});


test('displays available show dates', () => {
    render(<BookTicketForm  />);
    const dateButton = screen.getByText('Select Date');
    fireEvent.click(dateButton);
    const showDate = screen.getByText('May 20');
    expect(showDate).toBeInTheDocument();
  });
  
  test('displays available show times for selected date', () => {
    render(<BookTicketForm  />);
    const dateButton = screen.getByText('Select Date');
    fireEvent.click(dateButton);
    const showDate = screen.getByText('May 20');
    fireEvent.click(showDate);
    const timeButton = screen.getByText('Select Time');
    fireEvent.click(timeButton);
    const showTime = screen.getByText('10:00 AM');
    expect(showTime).toBeInTheDocument();
  });

  test('selects seats and calculates total price', () => {
    render(<BookTicketForm  />);
    const bookNowButton = screen.getByText('Book Now');
    fireEvent.click(bookNowButton);
    const seat = screen.getByTestId('seat-A1');
    fireEvent.click(seat);
    expect(seat).toHaveClass('selected');
    const totalPrice = screen.getByText('Total Price: 100');
    expect(totalPrice).toBeInTheDocument();
  });
  
  test('books selected seats and proceeds to payment', () => {
    render(<BookTicketForm  />);
    const bookNowButton = screen.getByText('Book Now');
    fireEvent.click(bookNowButton);
    const seat = screen.getByTestId('seat-A1');
    fireEvent.click(seat);
    const generateBillButton = screen.getByText('Generate Bill 100');
    fireEvent.click(generateBillButton);
    const paymentButton = screen.getByText('PAY');
    fireEvent.click(paymentButton);
    const confirmDialog = screen.getByText('Would you like to continue?');
    expect(confirmDialog).toBeInTheDocument();
  });
  