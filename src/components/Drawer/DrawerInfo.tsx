import { useAppDispatch } from "../../hooks"
import { setOpen } from "../../redux/slices/drawerSlice"

interface DrawerInfo {
  image: string
  title: string
  text: string
}

export function DrawerInfo ({ image, title, text }: DrawerInfo) {
  const dispatch = useAppDispatch()

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <img className="mb-6 mx-auto" src={`img/${image}`} width={120} height={120} alt={title} />
        <h3 className="text-[22px] font-semibold mb-2">{ title }</h3>
        <p className="opacity-40 px-[20px] mb-10">{ text }</p>
        <button onClick={() => dispatch(setOpen(false))} className="flex items-center justify-center mx-auto w-[245px] rounded-[18px] bg-[#9DD458] py-[15px] duration-200 hover:bg-[#80b044]" type="button">
          <img className="rotate-180 mr-[20px]" src="img/icons/order-arrow.svg" alt="arrow" />
          <span className="text-white text-base t font-semibold">Вернуться назад</span>
        </button>
      </div>  
    </div>
  )
}