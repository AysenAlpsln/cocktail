import { useDispatch, useSelector } from 'react-redux';
import { fetchDetail } from '../../redux/detailSlice';
import { AiOutlineInfoCircle } from 'react-icons/ai';



function MiniDetail(props) {
  const ingredients = useSelector((state) => state.details.ingredients);
  const dispatch = useDispatch();
  const id = props.id;

  const handleMouseEnter = () => {
    dispatch(fetchDetail(id));
  };

  return (
    <div className="inside" onMouseEnter={handleMouseEnter}>
      <div className="icon">
        <AiOutlineInfoCircle/>
      </div>
      <div className="contents">
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
      </div>
    </div>
  )
}

export default MiniDetail