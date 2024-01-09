import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import { setOpen } from "../redux/slices/drawerSlice"
import { useEffect, useState } from "react"

export function Navigation () {
  const dispatch = useAppDispatch()
  const totalPrice = useAppSelector(state => state.drawer.totalPrice)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function closeHandler (event: MouseEvent) {
      if ((!(event.target as HTMLElement).closest('ul') && !(event.target as HTMLElement).closest('.burger')) || (event.target as HTMLElement).closest('li')) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', closeHandler)
    
    return () => {
      document.body.removeEventListener('click', closeHandler)
    }
  }, [])

  return (
    <>
      <button onClick={() => setIsOpen(prev => !prev)} className={`burger ${isOpen ? '_active': ''} sm:hidden`} type="button">
        <span></span>
      </button>
      <ul className={`${isOpen ? 'max-sm:opacity-100 max-sm:visible max-sm:translate-y-0' : ' max-sm:opacity-0 max-sm:invisible max-sm:-translate-y-6'} sm:flex sm:items-center max-sm:absolute max-sm:top-[90%] max-sm:right-4 max-sm:z-10 max-sm:bg-[#E7F6FF] max-sm:rounded-md p-3 duration-300`}>
        <li onClick={() => dispatch(setOpen(true))} className="flex cursor-pointer max-sm:my-3 mr-8">
          <img className="mr-[10px]" src="img/icons/cart.svg" alt="cart" />
          <span className="font-semibold text-[#5C5C5C] sm:text-[14px]">{ totalPrice } ₽</span>
        </li>
        <Link to={'/favorites'}>
          <li className="flex cursor-pointer max-sm:mb-3 mr-8">
            <img className="mr-[10px]" src="img/icons/favorite.svg" alt="favorites" />
            <span className="font-semibold text-[#5C5C5C] sm:text-[14px]">Закладки</span>
          </li>
        </Link>
        <Link to={'/profile'}>
          <li className="flex cursor-pointer max-sm:mb-3">
            <img className="mr-[10px]" src="img/icons/user.svg" alt="user" />
            <span className="font-semibold text-[#5C5C5C] sm:text-[14px]">Профиль</span>
          </li>
        </Link>
      </ul>
    </>
  )
}