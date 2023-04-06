import React from "react";
import { useAppSelector } from "../app/hooks";
import { Order } from "../types/Order";

export const Orders: React.FC = () => {
  const {user} = useAppSelector(state => state.auth);
  const [order, setOrder] = React.useState<Order | undefined>(undefined);
  const handleGenerateOrder = () => {
    const first = getRandom(FIRSTS);
    const last = getRandom(LASTS);
    setOrder({
      userId: user!.id,
      email: first + '.' + last + '@test.com',
      first,
      last,
      total: Math.floor((Math.random()*1000))
    });
  }

  return (
    <>
      <div className="d-flex justify-content-center m-3">
        <button className="btn btn-primary" onClick={handleGenerateOrder}>Generate Order</button>
      </div>      
      {order && 
        <div className="d-flex flex-column">
          <div>New Order</div>
          <div>User: {order?.userId}</div>
          <div>First: {order?.first}</div>
          <div>Last: {order?.last}</div>
          <div>Total: {order?.total}</div>
        </div>}
    </>
  )
}

function getRandom (arr: any[]) {
  return arr[Math.floor((Math.random()*arr.length))];
}

const FIRSTS = ['Aaron', 'Bob', 'Chad', 'Donald', 'Evan', 'Frank', 'Gaylord'];
const LASTS = ['Smith', 'Ford', 'Cohen', 'Glover', 'Hawke', 'Sinclair', 'Foker'];