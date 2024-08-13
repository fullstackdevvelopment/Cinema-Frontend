import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Film from './pages/Film';
import Catalog from './pages/Catalog';
import Ticket from './pages/Ticket';
import SignIn from './pages/SignIn';
import Reset from './pages/Reset';
import BuyTicketStageOne from './pages/BuyTickets/BuyTicketStageOne';
import BuyTicketStageTwo from './pages/BuyTickets/BuyTicketStageTwo';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import BuyTicketStageThree from './pages/BuyTickets/BuyTicketStageThree';
import BuyTicketStageFinal from './pages/BuyTickets/BuyTicketStageFinal';
import ScrollToTop from './helpers/ScrollToTop';
import Verification from './pages/Verification';
import ResetPassword from './pages/ResetPassword';
import CheckoutPage from './pages/BuyTickets/CheckoutPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/film/:movieId" element={<Film />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/ticket/buy/:movieId" element={<BuyTicketStageOne />} />
        <Route path="/ticket/buy/:movieId/:scheduleId/" element={<BuyTicketStageOne />} />
        <Route path="/ticket/buy/:movieId/:scheduleId/:date/:hour/:stage" element={<BuyTicketStageTwo />} />
        <Route path="/ticket/buy/:movieId/:scheduleId/:date/:hour/:stage/:queryString" element={<BuyTicketStageThree />} />
        <Route path="/:movieId/:scheduleId/:date/:hour/:stageThree/:seatsParam/checkout" element={<CheckoutPage />} />
        <Route path="/ticket/buy/:movieId/:scheduleId/:date/:hour/:stage/:seatsParam/final" element={<BuyTicketStageFinal />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/reset/password" element={<Reset />} />
        <Route path="/reset/password/:verificationCode" element={<ResetPassword />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/email/verification" element={<Verification />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/not_found" />} />
        <Route path="/not_found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
