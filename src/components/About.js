import {NavLink } from 'react-router-dom';
import TmdbLogo from '../images/tmdb-logo.svg';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const About = () => {
    return (
        <>
        <div className = "Title" style={{display:"flex", justifyContent:"center", marginBottom:"30px", marginTop: "250px"}}>
            <h1>Welcome to MVDB!</h1>
        </div>
        <Container style={{display:"flex"}}>
            <Row>
                <Col style={{margin:"30px"}}>
                    <h1 style={{fontSize:"1.5em"}}>MVDB is a database of current and past movies, and allows for listings based on popularity, ratings, new releases, and upcoming releases.</h1>
                    <h1 style={{fontSize:"1.5em"}}>If you see something you like, don't forget to favourite it!</h1>
                </Col>
                <Col style={{margin:"30px"}}>
                    <h1 style={{fontSize:"1.5em"}}>This database utilizes, but is not endorsed nor certified by TMDb.</h1>
                    <img src = {TmdbLogo} width="100" height ="100"/>
                </Col>
            </Row>
        </Container>
    </>
    )
}

export default About;