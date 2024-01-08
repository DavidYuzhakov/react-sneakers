import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
//Redux
import { Status, fetchSneakers } from "../redux/slices/sneakersSlice";
import { fetchItems } from "../redux/slices/drawerSlice";
import { fetchFavItems } from "../redux/slices/favoritesSlice";
import { setSort } from "../redux/slices/filterSlice";

import { useAppDispatch, useAppSelector } from "../hooks";

import { Card, ItemSkeleton, Filter, list, Info } from '../components'

export default function HomePage () {
  const isSearch = useRef(false)

  const dispatch = useAppDispatch()
  const {value, sort} = useAppSelector(state => state.filter)
  const {items, status} = useAppSelector(state => state.sneakers)
  

  const debounce = useDebounce(value, 500)

  const [searchParams, setSearchParams] = useSearchParams()
  const sortQuery = searchParams.get('sort') || 'name' 

  useEffect(() => {
    if (searchParams.size > 0) {
      const sortItem = list.find(obj => obj.property === sortQuery)
      dispatch(setSort(sortItem || list[0]))

      isSearch.current = true
    } 
  }, [])

  useEffect(() => { 
    if (!isSearch.current) {
      dispatch(fetchSneakers({value, sort}))
    }
    isSearch.current = false
  }, [debounce, sort])

  useEffect(() => {
    dispatch(fetchItems())
    dispatch(fetchFavItems())
  }, [])

  const skeletons = [...new Array(4)].map((_, i) => <ItemSkeleton key={i} />)
  const sneakers = items.map((val) => <Card key={val.id} {...val} />)

  return (
    <div className="s-container">
      <div className="md:flex justify-between items-center mb-10">
        <h1 className="text-black text-[32px] font-bold max-md:mb-2">{value ? 'Поиск...' : 'Все кроссовки'}</h1>
        <Filter setSearchParams={setSearchParams} />
      </div>
      {status === "error" && <Info image="emodji-2.png" title="Произошла ошибка😕" text="Не удалось получить кроссовки. Попробуйте повторить позже!" notButton />}
      <div className="content">
        {status === Status.LOADING && skeletons}
        {status === Status.SUCCESS && sneakers }
      </div>
      {sneakers.length < 1 && status === Status.SUCCESS && <Info image="emodji-1.png" title="Не найдено" text='Кроссовки которые вы искали нет в интернет-магазине' notButton />}
    </div>
  )
}