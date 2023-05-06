import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Spinner } from "../components/Spinner";
import { getOrders } from "../features/gallery/gallerySlice";

// export const Orders: React.FC = () => {
//   const {user} = useAppSelector(state => state.auth);
//   const [order, setOrder] = React.useState<Order | undefined>(undefined);
//   const handleGenerateOrder = () => {
//     const first = getRandom(FIRSTS);
//     const last = getRandom(LASTS);
//     setOrder({
//       userId: user!.id,
//       email: first + '.' + last + '@test.com',
//       first,
//       last,
//       total: Math.floor((Math.random()*1000))
//     });
//   }

//   return (
//     <>
//       <div className="d-flex justify-content-center m-3">
//         <button className="btn btn-primary" onClick={handleGenerateOrder}>Generate Order</button>
//       </div>      
//       {order && 
//         <div className="d-flex flex-column">
//           <div>New Order</div>
//           <div>User: {order?.userId}</div>
//           <div>First: {order?.first}</div>
//           <div>Last: {order?.last}</div>
//           <div>Total: {order?.total}</div>
//         </div>}
//     </>
//   )
// }

// function getRandom (arr: any[]) {
//   return arr[Math.floor((Math.random()*arr.length))];
// }

// const FIRSTS = ['Aaron', 'Bob', 'Chad', 'Donald', 'Evan', 'Frank', 'Gaylord'];
// const LASTS = ['Smith', 'Ford', 'Cohen', 'Glover', 'Hawke', 'Sinclair', 'Foker'];

export const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, orders } = useAppSelector(state => state.gallery);

  React.useEffect(() => {
      dispatch(getOrders());
  }, [dispatch]);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
};

  return(loading ? <Spinner /> :
    <table className="table table-sm table-borderless">
      <thead>
          <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Name</th>
              {/* <th>Address</th> */}
              <th>Items</th>
              <th>Total</th>
          </tr>
      </thead>
      <tbody>
          {orders?.length > 0 && orders.map(o => 
              <tr key={o.id} className="small">
                  <td>{o.id}
                      {/* <Link to={`orders/${o.id}`}>
                          {o.id}
                      </Link> */}
                  </td>
                  <td>{(new Date(o.createdAt)).toLocaleDateString('en-US', options)}</td>
                  <td>{o.first + " " + o.last}</td>
                  {/* <td><Address address={o.shippingAddress} /></td> */}
                  <td>{o.items.length}</td>
                  <td>${o.total.toFixed(2)}</td>
              </tr>)}
      </tbody>
    </table>
  );
}