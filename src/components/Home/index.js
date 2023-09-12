import {useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCocktails } from '../../redux/cocktailsSlice';
import Card from './card';

function Home() {
  const cocktails = useSelector((state) => state.cocktails.drinks);
  const isLoading = useSelector((state) => state.cocktails.isLoading);
  const error = useSelector((state) => state.cocktails.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch])

  if(isLoading) {
    return <div>loading..</div> // loading ekranı tasarlanacak
  }

  if(error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <div className='listTitle'>
        <h1>
          Cocktails
        </h1>
      </div>
      <div className='listContainer'>
        {
          cocktails.map(drink => (
            <Card 
              id={drink.idDrink}
              title={drink.strDrink}
              image={drink.strDrinkThumb}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Home;