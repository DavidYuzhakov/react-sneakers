import { Link } from "react-router-dom";
import { useEffect } from "react";

import { fetchFavItems } from "../redux/slices/favoritesSlice";
import { Status } from "../redux/slices/sneakersSlice";
import { fetchItems } from "../redux/slices/drawerSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

import { Card, Info, ItemSkeleton } from "../components";

export default function FavoritesPage () {
  const dispatch = useAppDispatch()
  const { favItems, status } = useAppSelector(state => state.favorites)

  useEffect(() => {
    dispatch(fetchItems())
    dispatch(fetchFavItems()) 
  }, [])

  const favorites = favItems.map(item => <Card key={item.parentId} {...item} id={item.parentId} />)
  const skeletons = [...new Array(4)].map((_, i) => <ItemSkeleton key={i} />)

  return (
    <div className="s-container">
      <div className="flex items-center mb-10">
        <Link to={'/'}>
          <button type="button">
            <img src="/img/icons/arrow-left.svg" alt="back" />
          </button>
        </Link>
        <h1 className="text-black md:text-[32px] text-[28px] font-bold md:ml-5 ml-3">Мои Закладки</h1>
      </div>
      {favItems.length < 1 && status === Status.SUCCESS && <Info image="emodji-2.png" title="Закладок нет :(" text="Вы ничего не добавляли в закладки" />}
      {status === Status.ERROR && <Info image="emodji-2.png" title="Произошла ошибка😕" text="Не удалось загрузить кроссовки. Попробуйте повторить позже!" notButton />}
      <div className="content">
        {status === Status.SUCCESS && favorites}
        {status === Status.LOADING && skeletons}
      </div>
    </div>
  )
}