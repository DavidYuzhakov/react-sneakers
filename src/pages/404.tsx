import { useEffect } from "react"
import { fetchItems } from "../redux/slices/drawerSlice"
import { useAppDispatch } from "../hooks"

export default function NotFound () {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  return (
    <div className="height-full flex justify-center flex-col items-center p-20 text-center">
      <img className="mb-5" src={'./img/404.webp'} width={300} height={300} alt="Not Found" />
      <h1 className="text-4xl font-bold mb-3">Ошибка 4😕4!</h1>
      <p>Ошибка 404! К сожалению такой страницы нет, <br />попробуйте найти что-нибудь другое на нашем сайте!</p>
    </div>
  )
}