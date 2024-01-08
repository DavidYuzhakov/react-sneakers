import { useAppDispatch } from "../../hooks";
import { removeItem } from "../../redux/slices/drawerSlice";

interface DrawerCardProps {
  id: number,
  price: number,
  image: string,
  name: string
}

export function DrawerCard ({ id, image, name, price }: DrawerCardProps) {
  const dispatch = useAppDispatch()

  return (
    <div className="relative p-[20px] flex rounded-[20px] border border-[#F3F3F3] w-full mb-5">
      <img
        className="mr-[20px]"
        src={`/img/sneakers/sneakers-${image}`}
        width={70}
        height={70}
        alt="sneaker"
      />
      <div className="max-w-[150px]">
        <h4 className="text-sm mb-2">{name}</h4>
        <p className="text-sm font-bold">{price} руб.</p>
      </div>
      <button
        onClick={() => dispatch(removeItem(id))}
        className="absolute right-5 bottom-5"
        type="button"
      >
        <img src="/img/icons/remove.svg" alt="remove" />
      </button>
    </div>
  )
}