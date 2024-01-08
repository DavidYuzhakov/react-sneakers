import { Outlet } from "react-router-dom"
import Loadable from 'react-loadable';
import { useAppSelector } from "../hooks"
import { Header } from "../components"

const Drawer = Loadable({
  loader: () => import(/* webpackChunkName: "drawer" */ '../components/Drawer'),
  loading: () => <div>Загрузка...</div>
})

const MainLayout = () => {
  const open = useAppSelector(state => state.drawer.open)

  if (open) {
    document.body.classList.add('_modal')
  } else {
    document.body.classList.remove('_modal')
  }

  return (
    <div className="bg-white lg:rounded-[20px] max-w-[1080px] mx-auto lg:my-[65px] min-h-full ">
      {open && <Drawer />}
      <Header />
      <Outlet />
    </div>
  )
}

export default MainLayout
