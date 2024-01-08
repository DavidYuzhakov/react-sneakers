import { Link } from "react-router-dom";
import { Navigation } from "./";

export function Header () {

  return (
    <header className="relative lg:py-10 border-b-1 border-b border-[#EAEAEA] py-5">
      <div className="w-full lg:px-[60px] flex justify-between items-center md:px-8 px-4">
        <Link to={'/'}>
          <div className="flex items-center">
            <img className="mr-4 w-[40px] h-[40px]" src="./img/logo.png" alt="logo" />
            <div className="max-md:hidden">
              <h3 className="text-black font-bold text-xl uppercase">react sneakers</h3>
              <p className="text-[#9D9D9D] text-sm">Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>
        <Navigation />
      </div>
    </header>
  )
}