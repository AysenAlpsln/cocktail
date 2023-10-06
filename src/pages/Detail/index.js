import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BiSolidDrink } from 'react-icons/bi';
import axios from 'axios';
import Footer from '../../components/Footer';


function Detail() {
  const [cocktail, setCocktail] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}lookup.php?i=${id}`)
      .then(res => res.data)
      .then(data => setCocktail(data?.drinks[0]))
  }, [id])


  for (var key in cocktail) {
    if (key.startsWith("strIngredient")) {
      var num = key.match(/\d+/g)[0];
      var mesKey = "strMeasure" + key.match(/\d+/g)[0]; // içerik numarası
      if(cocktail[key] !== null) {
        ingredients.push({id: num, ing: cocktail[key], mes: cocktail[mesKey]});
      }
    }
  }

  console.log(cocktail)
  return (
    <div>
      <div className="detail-content">
        <div className="navigation">{cocktail?.strDrink}</div>
        <div className="cocktail-image">
          <img src={cocktail?.strDrinkThumb} alt={cocktail?.strDrink} />
        </div>
        <div className="cocktail-recipe">
          <div className="cocktail-recipe__title">
            <div className="cocktail-name">
              {cocktail?.strDrink}
            </div>
            <div className="cocktail-serving">
              <BiSolidDrink />
              <p>{cocktail?.strGlass}</p> {/* Bardak çeşidi */}
            </div>
          </div>
          <div className="cocktail-recipe__ingredients">
            <div className="cocktail-recipe__ingredients__item">
              <h4>Ingredients</h4>
              <ul>
                {
                  ingredients.map(item => (
                    <li key={item.id}>{item.mes} {item.ing}</li>
                  ))
                }
              </ul>
            </div>
          </div>
          
          <div className="cocktail-recipe__subtitle">instructions</div>
          
          {cocktail?.strInstructions &&
            <div className="cocktail-recipe__number">EN</div>
          }
          {cocktail?.strInstructions &&
            <div className="cocktail-recipe__steps">{cocktail.strInstructions}</div>
          }
          {cocktail?.strInstructionsDE &&
            <div className="cocktail-recipe__number">DE</div>
          }
          {cocktail?.strInstructionsDE &&
            <div className="cocktail-recipe__steps">{cocktail.strInstructionsDE}</div>
          }
          {cocktail?.strInstructionsFR &&
            <div className="cocktail-recipe__number">FR</div>
          }
          {cocktail?.strInstructionsFR &&
            <div className="cocktail-recipe__steps">{cocktail.strInstructionsFR}</div>
          }
          {cocktail?.strInstructionsIT &&
            <div className="cocktail-recipe__number">IT</div>
          }
          {cocktail?.strInstructionsIT &&
            <div className="cocktail-recipe__steps">{cocktail.strInstructionsIT}</div>
          }

        </div>
        
        <Footer />

      </div>
    </div>
  )
}

export default Detail