import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiSolidDrink, BiArrowBack } from 'react-icons/bi';
import Footer from '../../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDetail } from '../../redux/detailSlice';
import Loading from '../../components/Loading';
import Error from '../../components/Error';


function Detail() {
  const details = useSelector((state) => state.details.features[0]);
  const status = useSelector((state) => state.details.status);
  const error = useSelector((state) => state.details.error);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([]);
  


  useEffect(() => {
    if(status === 'idle') {
      dispatch(fetchDetail(id));
    }
  }, [dispatch, status, id])


  for (var key in details) {
    if (key.startsWith("strIngredient")) {
      var num = key.match(/\d+/g)[0];
      var mesKey = "strMeasure" + key.match(/\d+/g)[0]; // içerik numarası
      if(details[key] !== null) {
        ingredients.push({id: num, ing: details[key], mes: details[mesKey]});
      }
    }
  }

  console.log(details)

  if(status === 'failed') {
    return <Error error={error} />
  }

  if(status === 'loading') {
    return (<Loading />)
  }
  
  if(status === 'succeeded') {
    return (
      <div>
        <div className="detail-content">
          <div className="navigation">{details?.strDrink}</div>
          <div className="cocktail-image">
            <img src={details?.strDrinkThumb} alt={details?.strDrink} />
          </div>
          <div className="cocktail-recipe">
            <div className='navigate-back' onClick={() => navigate(-1)}>
              <BiArrowBack />
            </div>
            <div className="cocktail-recipe__title">
              <div className="cocktail-name">
                {details?.strDrink}
              </div>
              <div className="cocktail-serving">
                <BiSolidDrink />
                <p>{details?.strGlass}</p> {/* Bardak çeşidi */}
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
            
            {details?.strInstructions &&
              <div className="cocktail-recipe__number">EN</div>
            }
            {details?.strInstructions &&
              <div className="cocktail-recipe__steps">{details.strInstructions}</div>
            }
            {details?.strInstructionsDE &&
              <div className="cocktail-recipe__number">DE</div>
            }
            {details?.strInstructionsDE &&
              <div className="cocktail-recipe__steps">{details.strInstructionsDE}</div>
            }
            {details?.strInstructionsFR &&
              <div className="cocktail-recipe__number">FR</div>
            }
            {details?.strInstructionsFR &&
              <div className="cocktail-recipe__steps">{details.strInstructionsFR}</div>
            }
            {details?.strInstructionsIT &&
              <div className="cocktail-recipe__number">IT</div>
            }
            {details?.strInstructionsIT &&
              <div className="cocktail-recipe__steps">{details.strInstructionsIT}</div>
            }
  
          </div>
          
          <Footer />
  
        </div>
      </div>
    )
  }
  
}

export default Detail