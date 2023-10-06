import {useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCocktails } from '../../redux/cocktailsSlice';
import Card from './card';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

function Home() {
  const cocktails = useSelector((state) => state.cocktails.drinks);
  const status = useSelector((state) => state.cocktails.status);
  const page = useSelector((state) => state.cocktails.page);
  const hasNextPage = useSelector((state) => state.cocktails.hasNextPage);
  const error = useSelector((state) => state.cocktails.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if(status === 'idle') {
      dispatch(fetchCocktails());
    }
  }, [dispatch, status])

  if(status === 'failed') {
    return <Error error={error} />
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
      
      <div className='moreButton'>
        {status === 'loading' && <Loading />}
        {hasNextPage && status !== 'loading' &&
          <button onClick={() => dispatch(fetchCocktails(page))}>
            Load More
          </button>
        }
        {!hasNextPage && status !== 'loading' &&
        <div className='nothingShown'>
          There is nothing to be shown.
        </div>
        }
        
      </div>
    </div>
  )
}

export default Home;