import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Sort, setSort, setValue } from "../redux/slices/filterSlice"

type Param = {
  sort: 'name' | '-price' | 'price'
}

interface FilterProps {
  setSearchParams: (query: Param) => void
}

export const list: Sort[] = [
  {name: 'По названию', property: 'name'},
  {name: 'По цене (дешевые)', property: 'price'},
  {name: 'По цене (дорогие)', property: '-price'}
]

export function Filter ({ setSearchParams }: FilterProps) {
  const [open, setOpen] = useState(false)
  const input = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()
  const {value, sort} = useAppSelector(state => state.filter)

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setValue(event.target.value))
  }

  function clearHandler () {
    dispatch(setValue(''))
    if (input.current) {
      input.current.focus();
    }
  }

  function sortHandler (item: Sort) {
    if (item.property !== sort.property) {
      dispatch(setSort(item))
      setSearchParams({sort: item.property})
    }
    setOpen(false)
  }

  
  useEffect(() => {
    function closeHandler (event: MouseEvent) {
      if (!(event.target as HTMLElement).closest('.sort')) {
        setOpen(false)
      }
    }
    document.body.addEventListener('click', closeHandler)

    return () => {
      document.body.removeEventListener('click', closeHandler)
    }
  }, [])


  return (
    <div className="flex items-center gap-4 max-md:justify-between flex-wrap">
      <div className="sort relative w-[200px] max-[440px]:w-full">
        <button 
          type="button" 
          onClick={() => setOpen(prev => !prev)} 
          className="flex items-center justify-between w-full px-3 py-3 border border-[#ededed] rounded"
        > 
          <span className="mr-2">{ sort.name }</span>
          <svg className={open ? '-rotate-90 duration-200' : 'rotate-90 duration-200'} xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M1 0.999999L6 6L1 11" stroke="#C8C8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <ul className={`duration-200 ${open ? 'opacity-100 translate-y-0 visible' : '-translate-y-5 opacity-0 invisible'} rounded-[5px] absolute top-[120%] left-0 z-[1] md:text-sm cursor-pointer outline-none border-[#F3F3F3] border bg-white w-full`}>
          {list.map((item, i) => 
            <li 
              key={i}
              className="md:px-3 md:py-2 border-b border-[#f3f3f3] hover:bg-[#f3f3f3] duration-100 last-of-type:border-b-0 px-5 py-3 "
              onClick={() => sortHandler(item)}
            >{item.name}</li>)}
        </ul>
      </div>
      <div className="min-[440px]:max-w-[250px] w-full flex items-center rounded-[10px] border border-[#F3F3F3] py-[14px] px-[18px]">
        <img className="mr-[10px] cursor-pointer" src="/img/icons/search.svg" alt="search" />
        <input 
          ref={input}
          className="text-sm outline-none placeholder:text-[#C4C4C4] w-full"
          type="search" 
          placeholder="Поиск..."
          value={value}
          onChange={onChangeHandler}
        />
        {value && <button type="button" onClick={clearHandler} className="text-[#5c5c5c] text-lg leading-none">&times;</button>}
      </div>
    </div>
  )
}