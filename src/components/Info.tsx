import { Link } from "react-router-dom"

interface InfoProps {
  image: string,
  title: string,
  text: string,
  notButton?: boolean,
  drawer?: boolean
}

export function Info ({ image, title, text, notButton }: InfoProps) {
  return (
    <div className={`text-center mx-auto my-20`}>
      <img width={70} height={70} className="mb-[20px] mx-auto" src={`/img/${image}`} alt="emodji" />
      <h2 className="font-semibold text-2xl mb-3">{ title }</h2>
      <p className="text-base opacity-40 mb-9">{ text }</p>
      {!notButton && 
        <Link to={'/'}>
          <button className="flex items-center justify-center mx-auto w-[245px] rounded-[18px] bg-[#9DD458] py-[15px] duration-200 hover:bg-[#80b044]" type="button">
            <img className="rotate-180 mr-[20px]" src="/img/icons/order-arrow.svg" alt="arrow" />
            <span className="text-white text-base t font-semibold">Вернуться назад</span>
          </button>
        </Link>
      } 
    </div>
  )
}