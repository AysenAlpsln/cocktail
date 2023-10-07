import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetail } from '../../redux/detailSlice';


function MiniDetail(props) {
  const details = useSelector((state) => state.details.features[0]);
  const status = useSelector((state) => state.details.status);
  const dispatch = useDispatch();
  const id = props.id;

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDetail(id));
    }
  }, [dispatch, status, id])

  for (var key in details) {
    if (key.startsWith("strIngredient")) {
      var num = key.match(/\d+/g)[0];
      var mesKey = "strMeasure" + key.match(/\d+/g)[0]; // içerik numarası
      if (details[key] !== null) {
        ingredients.push({ id: num, ing: details[key], mes: details[mesKey] });
      }
    }
  }

  console.log(details)
  console.log(ingredients)

  return (
    <table>
      <tbody>
        <tr>
          <th>Ingredients</th>
        </tr>
        {
          ingredients.map(item => (
            <tr key={item.id}>
              <td>{item.mes} {item.ing}</td>
            </tr>
          ))
        }
      </tbody>
    </table>

  )
}

export default MiniDetail