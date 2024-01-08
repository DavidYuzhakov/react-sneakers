import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeItem, setArrId, setOpen } from "../../redux/slices/drawerSlice";
import { Status } from "../../redux/slices/sneakersSlice";
import { addOrderItems, fetchOrderItems } from "../../redux/slices/ordersSlice";

import { DrawerInfo, DrawerSkeleton, DrawerCard } from "../";

export default function Drawer() {
  const dispatch = useAppDispatch();
  const { items, status, totalPrice, arrId } = useAppSelector((state) => state.drawer);
  const { orderStatus, ordersItems } = useAppSelector(state => state.orders)
  const [isShow, setIsShow] = useState(false)

  const drawerItems = items.map((item) => <DrawerCard key={item.id} {...item} />);
  const skeletons = [...new Array(2)].map((_, i) => <DrawerSkeleton key={i} />);

  useEffect(() => {
    dispatch(fetchOrderItems())
  }, [])
  
  const drawerOrder = () => {
    const text = arrId.length > 1 ? `Ваши заказы ${arrId.length < 7 ? arrId.join(',') : ''} скоро будут переданы курьерской доставкой` : `Ваш заказ ${arrId.join(', ')} скоро будет передан курьерской доставкой`
    return (
      <> 
        {orderStatus === Status.SUCCESS && <DrawerInfo text={text} title="Заказ оформлен!" image="order.png" />}
        {orderStatus === Status.ERROR && <DrawerInfo text={'Ошибка при оформлении заказа. Повоторите попытку позже.'} title="Ошибка заказа :(" image="emodji-1.png" />}
      </>
    )
  }

  function handleClick () {   
    const itemsToAdd = items.filter((item) => {
      const result = ordersItems.some(orderItem => orderItem.parentId === item.parentId)
      return !result
    })
    if (itemsToAdd.length > 0) {
      dispatch(addOrderItems(itemsToAdd))
    }

    items.forEach(item => dispatch(removeItem(item.id)))
    dispatch(setArrId())
    setIsShow(true)
  }

  return ( 
    <>
      <div
        onClick={() => dispatch(setOpen(false))}
        className="bg-black/50 fixed top-0 left-0 w-full h-full z-10"
      ></div>
      <div className="flex flex-col justify-between fixed right-0 top-0 max-w-[385px] w-full h-full bg-white z-[11] shadow-[-10px_4px_24x_0_rgba(0,0,0,0.1)] md:p-[30px] p-5">
        <div className="flex items-center justify-between mb-[30px]">
            <h2 className="text-2xl font-bold ">Корзина</h2>
            <button onClick={() => dispatch(setOpen(false))} type="button">
              <img src="/img/icons/remove.svg" alt="close" />
            </button>
        </div>
        <div className="h-[85%] overflow-auto">
          {isShow && drawerOrder()}
          {status === Status.SUCCESS && drawerItems}
          {status === Status.LOADING && skeletons}
          {(!drawerItems.length && !isShow) && <DrawerInfo image="box.png" title="Корзина пустая" text="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." />}
        </div>
        {drawerItems.length > 0 && (
          <div className="pt-3">
            <ul className="mb-6">
              <li className="flex mb-5">
                <span>Итого:</span>
                <div className="flex-grow border-b border-dashed border-[#DFDFDF] m-2"></div>
                <b>{totalPrice} руб.</b>
              </li>
              <li className="flex">
                <span>Налог 5%:</span>
                <div className="flex-grow border-b border-dashed border-[#DFDFDF] mx-2"></div>
                <b>{(totalPrice * 0.05).toFixed(2)} руб.</b>
              </li>
            </ul>
            <button onClick={() => handleClick()} className="relative w-full rounded-[18px] bg-[#9DD458] py-[15px] duration-200 hover:bg-[#80b044]" type="button">
              <span className="text-white text-base font-semibold">
                Оформить заказ
              </span>
              <img
                className="absolute top-[21px] bottom-[21px] right-[40px]"
                src="/img/icons/order-arrow.svg"
                alt="arrow"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
