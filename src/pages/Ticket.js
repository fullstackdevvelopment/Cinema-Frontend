import React from 'react';
import Wrapper from '../components/commons/Wrapper';
import ScheduleList from '../components/TicketComponents/ScheduleList';

function Ticket() {
  return (
    <Wrapper>
      <div className="schedule">
        <div className="container">
          <ScheduleList />
        </div>
      </div>
    </Wrapper>
  );
}

export default Ticket;
