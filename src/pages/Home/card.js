import React from 'react';
import { AiOutlineInfoCircle, AiOutlineDoubleRight } from 'react-icons/ai'

function Card(props) {
  return (
    <div key={props.id} className="wrapper">
      <div className="container">
        <div className="top">
          <img src={props.image} />
        </div>
        <div className="bottom">
          <div className="left">
            <div className="details">
              <p>{props.title}</p>
            </div>
            <div className="go">
              <AiOutlineDoubleRight/>
            </div>
          </div>
          
        </div>
      </div>
      <div className="inside">
        <div className="icon">
          <AiOutlineInfoCircle/>
        </div>
        <div className="contents">
          <table>
            <tr>
              <th>Width</th>
              <th>Height</th>
            </tr>
            <tr>
              <td>3000mm</td>
              <td>4000mm</td>
            </tr>
            <tr>
              <th>Something</th>
              <th>Something</th>
            </tr>
            <tr>
              <td>200mm</td>
              <td>200mm</td>
            </tr>
            <tr>
              <th>Something</th>
              <th>Something</th>
            </tr>
            <tr>
              <td>200mm</td>
              <td>200mm</td>
            </tr>
            <tr>
              <th>Something</th>
              <th>Something</th>
            </tr>
            <tr>
              <td>200mm</td>
              <td>200mm</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Card