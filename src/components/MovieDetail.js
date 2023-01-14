import {useLocation} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NoImageIcon from '../images/no-image-icon.jpg';

const API_URL_IMG =  'https://image.tmdb.org/t/p/w500/'

const MovieDetail = (props) => {

const FavouriteComponent = props.favouriteComponent;
const RemoveFavouriteComponent = props.removeFavouriteComponent;

const location = useLocation();
const movieData = location.state;

    return (
            <Card style={{width:"46%"}}>
                <Card.Img src = {movieData.poster_path ? (API_URL_IMG+movieData.poster_path) : NoImageIcon} />
                <Card.Body>
                    <Card.Text style={{fontSize:"35px", fontWeight:"bold"}}>{movieData.title}</Card.Text>
                    <Card.Text>{movieData.overview}</Card.Text>
                    <Card.Text>Average User Score: {movieData.vote_average}</Card.Text>
                    <Card.Text>Release Date: {movieData.release_date}</Card.Text>
                    {/* conditionals to set the appropriate "favourite component" based on whether the 
                    current movie being mapped out exists in the props' favouriteList */}
                    {props.favourites.filter(e=>e.id===movieData.id).length == 0 &&
                    <Card.Text><div onClick={() => props.handleFavouritesClick(movieData)}>
                            <FavouriteComponent />
                        </div></Card.Text> 
                    }
                    {props.favourites.filter(e=>e.id===movieData.id).length > 0 &&
                    <Card.Text><div onClick={() => props.handleRemoveFavouritesClick(movieData)}>
                        <RemoveFavouriteComponent />
                    </div></Card.Text> 
                    }
                </Card.Body>
            </Card>
    )       
}

export default MovieDetail;