import { Link } from "react-router-dom";
import { useEffect } from "react";

import { fetchItems } from "../redux/slices/drawerSlice";
import { fetchOrderItems } from "../redux/slices/ordersSlice";
import { Status } from "../redux/slices/sneakersSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

import { OrderCard, Info, ItemSkeleton } from "../components";

export default function OrdersPage () {
  const dispatch = useAppDispatch()

  const {ordersItems, orderStatus} = useAppSelector((state) => state.orders);
  //Drawer
  useEffect(() => {
    dispatch(fetchOrderItems())
    dispatch(fetchItems())
  }, [])

  const cardItems = ordersItems.map((item) => {
    return (
      <OrderCard {...item} key={item.parentId} />
    )
  })
  const skeletons = [...new Array(4)].map((_, i) => <ItemSkeleton key={i} />)

  return (
    <div className="s-container">
      <div className="flex items-center mb-10">
        <Link to={'/'}>
          <button type="button">
            <img src="/img/icons/arrow-left.svg" alt="back" />
          </button>
        </Link>
        <h1 className="text-black text-[32px] font-bold ml-5">Мои покупки</h1>
      </div>
      <div className="content">
        {orderStatus === Status.SUCCESS && cardItems}
        {orderStatus === Status.LOADING && skeletons}
      </div>
      {(orderStatus === Status.SUCCESS && cardItems.length < 1) && <Info image="emodji-1.png" title="У вас нет заказов" text="Вы нищеброд? оформите хотя бы один заказ."/>}
    </div>
  )
}