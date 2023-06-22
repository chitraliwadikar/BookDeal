import React from 'react'
//import trash from "../trash.svg"
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../Components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("Order Response:", response)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }
  let totalPrice = data.reduce((total, book) => total + book.price, 0)
  return (
    <div>

      {/* {console.log(data)} */}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((book, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{book.name}</td>
                <td>{book.qty}</td>
                <td>{book.size}</td>
                <td>{book.price}</td>
                {/* <td ><button type="button" className="btn p-0"><img src={trash} alt="delete" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr> */}
                <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut}> Check Out </button>
        </div>
      </div>
    </div>
  )
}