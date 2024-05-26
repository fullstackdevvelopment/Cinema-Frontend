import React from 'react';
import MovieTicket from '../components/TicketComponents/MovieTicket';
import Wrapper from '../components/commons/Wrapper';

function Ticket() {
  return (
    <Wrapper>
      <div className="ticket">
        <MovieTicket />
        <MovieTicket />
        <MovieTicket />
        <MovieTicket />
      </div>
    </Wrapper>
  );
}

export default Ticket;
