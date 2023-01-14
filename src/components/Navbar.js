import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.png'

function NavBar() {
  return (
    <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="/react-p01-movie-app"><img src = {logo} width="250" height="150"></img></Navbar.Brand>
        <Navbar.Toggle />
          <Nav>
            <Nav.Link href="/react-p01-movie-app" style={{fontSize:"2em", color:"white"}}>Home</Nav.Link>
            <Nav.Link href="/about" style={{fontSize:"2em", color:"white"}}>About</Nav.Link>
            <Nav.Link href="/favourites" style={{fontSize:"2em", color:"white"}}>Favourites</Nav.Link>
          </Nav>
    </Navbar>
  );
}

export default NavBar;