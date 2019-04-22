import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EventBannerOne from './../../images/eventBannerOne.jpg';
import * as firebase from 'firebase'
import { CreateEventPage } from '../CreateEvents/CreateEventPage';
import { Link } from 'react-router-dom';

const styles = {
  card: {
    maxWidth: 1000,
  },
  media: {
    height: 550,
  },
};

export default class CardComponent extends Component {
  events;

  constructor(props) {
    super(props);
    firebase.database().ref('events').once('value', snapshot => {
      console.log(snapshot.val());
      this.events = snapshot.val();
    });
  }
  

  render() {
    return (
      <div className="cardComponent"> 
          <img src={EventBannerOne}/>
          <Link to="/eventDetails" style={{ textDecoration: 'none' }}>
            <Button size="small" color="primary">
            Know More About This Event
            </Button>
            </Link>
            <Button size="small" color="primary">
              Share
            </Button>
          
      </div>
        )
      }
}
