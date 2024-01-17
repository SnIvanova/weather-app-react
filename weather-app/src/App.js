import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import MyNav from './components/MyNav';
import CardWeather from './components/CardWeather';
import Geolocation from './components/Geolocation';
import MyFooter from './components/MyFooter';
import PageNotFound from './components/NotFound';

const Header = ({ scrolled }) => (
  <header className={`${scrolled > 100 ? 'scrolled' : undefined}`}>
    <MyNav />
    <p className="text-black-50 header-text d-flex mx-4">Search here your favourite city!</p>
  </header>
);

const Main = () => (
  <main>
    <Container fluid>
      <Routes>
        <Route element={<Geolocation />} path="/" />
        <Route element={<CardWeather />} path="/weather" />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Container>
  </main>
);

const Footer = () => (
  <footer>
    <MyFooter />
  </footer>
);

const App = ({ scroll }) => (
  <>
    <BrowserRouter>
      <Header scrolled={scroll} />
      <Main />
      <Footer />
    </BrowserRouter>
  </>
);

export default App;
