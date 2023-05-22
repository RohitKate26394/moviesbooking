import React from 'react';
import { render, screen } from '@testing-library/react';
import SeatsDashboard from './SeatsDashboard';

describe('SeatsDashboard', () => {
  test('fetches and renders show cards with seat information', async () => {
    // Mock the response data for the fetch request
    const mockShows = [
      {
        showNumber: 1,
        auditorium: 'Auditorium 1',
        seats: {
          Platinum: [
            { seatNumber: 1, booked: 'N', display: 'Y' },
            { seatNumber: 2, booked: 'Y', display: 'Y' },
          ],
          Gold: [
            { seatNumber: 3, booked: 'N', display: 'Y' },
            { seatNumber: 4, booked: 'N', display: 'Y' },
          ],
          Silver: [
            { seatNumber: 5, booked: 'N', display: 'Y' },
            { seatNumber: 6, booked: 'N', display: 'Y' },
          ],
        },
      },
    ];

    // Mock the fetch function and return the mockShows data
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockShows),
    });

    render(<SeatsDashboard />);

    // Check if the show cards are rendered with the correct information
    const showNumberElement = await screen.findByText((content, node) => {
      const hasText = (text) => node => node.textContent === text;
      const showNumberText = 'Show 1 Running in Auditorium 1:';
      const hasShowNumberText = hasText(showNumberText);
      const hasCategoryText = hasText('Platinum') && hasText('Gold') && hasText('Silver');
      return hasShowNumberText(node) && hasCategoryText(node);
    });
    expect(showNumberElement).toBeInTheDocument();

    // You can also check if specific seats are rendered correctly
    const seat1 = screen.getByText('1');
    const seat2 = screen.getByText('2');
    expect(seat1).toBeInTheDocument();
    expect(seat2).toBeInTheDocument();
  });

  test('handles error when fetching data', async () => {
    // Mock the fetch function and simulate an error response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    });

    render(<SeatsDashboard />);

    // Check if the error message is rendered
    const errorMessage = await screen.findByText('Error fetching data:', {}, { timeout: 5000 });
    expect(errorMessage).toBeInTheDocument();
  });
});
