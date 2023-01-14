import React from 'react';
import {Link} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import NoImageIcon from '../images/no-image-icon.jpg'

const API_URL_IMG =  'https://image.tmdb.org/t/p/w500/'

const MovieFrame = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    const RemoveFavouriteComponent = props.removeFavouriteComponent;

    return(
        <Row xs="4">
                {props.movies.map((movie, key) => 
                <Col key={key}>
                    <Card className="flex-fill"  style={{height:"100%"}}>
                        <Card.Img  src = {movie.poster_path ? (API_URL_IMG+movie.poster_path) : NoImageIcon} />
                        <Card.Body>
                            <Card.Text style={{fontSize:"35px", fontWeight:"bold"}}>{movie.title}</Card.Text>
                            {/* Ternary operator to check if overview exists - if not, state no summary available */}
                            <Card.Text>{movie.overview ? (movie.overview.substring(0,200) + "...") : "No Summary Available"}</Card.Text>
                            <Card.Text>Average User Score: {movie.vote_average}</Card.Text>
                            <Card.Text>Release Date: {movie.release_date}</Card.Text>
                            <Link to={`/movie/${movie.id}`} state = {movie}>Click here for more details</Link>
                        </Card.Body>
                    </Card>
                </Col>)} 
            </Row>);
};

export default MovieFrame;