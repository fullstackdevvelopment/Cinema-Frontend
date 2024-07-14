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
import BuyTicket1 from './pages/BuyTickets/BuyTicket1';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/film/:movieId" element={<Film />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/buyticket1" element={<BuyTicket1 />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/not_found" />} />
        <Route path="/not_found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
