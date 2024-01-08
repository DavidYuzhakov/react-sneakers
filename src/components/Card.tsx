import { useAppDispatch, useAppSelector } from "../hooks";
import { SneakersItem } from "../redux/slices/sneakersSlice";
import { addItem, removeItem } from "../redux/slices/drawerSlice";
import { addFavItem, removeFavItem } from "../redux/slices/favoritesSlice";

export function Card ({id, name, image, price}: SneakersItem) {
  const dispatch = useAppDispatch()
  const {items} = useAppSelector(state => state.drawer)  
  const {favItems} = useAppSelector(state => state.favorites)
    
  const isAdded = items.some((item) => item.parentId === id)
  const isFavorite = favItems.some((item) => item.parentId === id)

  function handleChecked(id: number) {
    const findItem = items.find(item => item.parentId === id)

    if (findItem) {
      dispatch(removeItem(findItem.id))
    } else {
      dispatch(addItem({ id, name, image, price }))  
    }
  }

  function handleFavorites (id: number) {
    const findItem = favItems.find(item => item.parentId === id)

    if (findItem) {
      dispatch(removeFavItem(findItem.id))
    } else {
      dispatch(addFavItem({ id, name, image, price }))
    }
  } 

  return (
    <div 
      className="relative border border-[#F3F3F3] rounded-[40px] max-w-[210px] p-[25px] duration-200	  hover:border-white hover:-translate-y-1 hover:shadow-lg max-md:mx-auto"
    >
      <button onClick={() => handleFavorites(id)} className="absolute top-[25px] left-[25px]" type="button">
        <img src={`img/icons/${isFavorite ? 'liked' : 'unliked'}.svg`} alt="favorite" />
      </button>
      <img width={133} height={112} className="mb-[14px]" src={`img/sneakers/sneakers-${image}`} alt="sneaker" />
      <h4 className="text-sm mb-[14px]">{ name }</h4>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[11px] uppercase text-[#bdbdbd] font-medium">цена:</p>
          <b>{price} ₽</b>
        </div> 
        <button type="button" onClick={() => handleChecked(id)}>
          <img src={`img/icons/${isAdded ? 'added' : 'unadded'}.svg`} alt="add" />
        </button>
      </div>
    </div>
  )
}