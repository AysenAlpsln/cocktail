import React from 'react';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { Link } from "react-router-dom";
import MiniDetail from './miniDetail';

function Card(props) {
  return (
    <div key={props.id} className="wrapper">
      <div className="container">
        <div className="top">
          <img src={props.image} alt={props.title}/>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="details">
              <p>{props.title}</p>
            </div>
            <Link to={`/cocktail/${props.id}`} className="go">
              <AiOutlineDoubleRight/>
            </Link>
          </div>
          
        </div>
      </div>
      <MiniDetail id={props.id} />
    </div>
  )
}

export default Card