import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import NoImageIcon from '../images/no-image-icon.jpg'



const API_URL_IMG =  'https://image.tmdb.org/t/p/w500/'

const Favourites = (props) => {

    const RemoveFavouriteComponent = props.removeFavouriteComponent;

    console.log("I'm here in favourites")

    if (props.movies.length ==0 ){

        return(
            <Container style={{marginTop:"300px"}}>
                <h1>Sorry! You have no movies in your favourites list. Feel free to return to the home page to add some!</h1>
            </Container>
        )
    }
        return(
            <Row xs="4">
            {props.movies.map((movie, key) => 
            <Col key={key}>
                <Card className="flex-fill" key={key}  style={{height:"100%"}}>
                    <Card.Img   src = {movie.poster_path ? (API_URL_IMG+movie.poster_path) : NoImageIcon} />
                    <Card.Body>
                        <Card.Text style={{fontSize:"20px"}}>{movie.title}</Card.Text>
                        <Card.Text>{movie.overview.substring(0,200)}...</Card.Text>
                        <Card.Text>Average User Score: {movie.vote_average}</Card.Text>
                        <Card.Text>Release Date: {movie.release_date}</Card.Text>
                        <Card.Text><div onClick={() => props.handleRemoveFavouritesClick(movie)}>
                            <RemoveFavouriteComponent />
                        </div></Card.Text> 
                        <Link to={`/movie/${movie.id}`} state = {movie}>Click here for more!</Link>
                    </Card.Body>
                </Card>
            </Col>)} 
        </Row>);
};

export default Favourites;