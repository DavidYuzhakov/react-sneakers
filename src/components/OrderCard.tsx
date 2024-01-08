import { SneakersItem } from "../redux/slices/sneakersSlice";

export function OrderCard ({ price, image, name }: SneakersItem) {
  return (
    <div 
      className="relative border border-[#F3F3F3] rounded-[40px] max-w-[210px] p-[25px] duration-200	  hover:border-white hover:-translate-y-1 hover:shadow-lg max-md:mx-auto"
    >
      <img width={133} height={112} className="mb-[14px]" src={`img/sneakers/sneakers-${image}`} alt="sneaker" />
      <h4 className="text-sm mb-[14px]">{ name }</h4>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[11px] uppercase text-[#bdbdbd] font-medium">цена:</p>
          <b>{price} ₽</b>
        </div> 
      </div>
    </div>
  )
}