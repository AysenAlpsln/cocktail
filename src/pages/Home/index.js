import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCocktails } from '../../redux/cocktailsSlice';
import { fetchSearch } from '../../redux/searchSlice';
import Card from './card';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

function Home() {
  const cocktails = useSelector((state) => state.cocktails.drinks);
  const status = useSelector((state) => state.cocktails.status);
  const page = useSelector((state) => state.cocktails.page);
  const hasNextPage = useSelector((state) => state.cocktails.hasNextPage);
  const error = useSelector((state) => state.cocktails.error);
  const search = useSelector((state) => state.search.drinks);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    if(status === 'idle') {
      dispatch(fetchCocktails());
    }
  }, [dispatch, status])

  useEffect(() => {
    if (searchText !== '') {
      dispatch(fetchSearch(searchText));
    } else if(searchText === '' && searchActive) {
      dispatch(fetchCocktails());
    }
  }, [dispatch, searchText, searchActive]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    setSearchActive(true);
  };

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
      <div className='searchArea'>
        <input 
          id='searchBar'
          placeholder='Search...'
          value={searchText}
          onChange={handleSearchTextChange}/>
      </div>
      <div className='listContainer'>
        {search.length === 0 &&
          cocktails.map(drink => (
            <Card 
              key={drink.idDrink}
              id={drink.idDrink}
              title={drink.strDrink}
              image={drink.strDrinkThumb}
            />
          ))
        }
        {search.length > 0 &&
          search.map(drink => (
            <Card 
              key={drink.idDrink}
              id={drink.idDrink}
              title={drink.strDrink}
              image={drink.strDrinkThumb}
            />
          ))
        }
      </div>
      
      <div className='moreButton'>
        {status === 'loading' && <Loading />}
        {hasNextPage && search.length === 0 && status !== 'loading' &&
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