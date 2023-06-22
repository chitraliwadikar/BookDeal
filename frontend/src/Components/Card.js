import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options); // has size and price

    const[qty,setQty] = useState(1)
    const[size, setSize] = useState("")
    
    const handleAddToCart = async() => {
    let book = []
    for (const item of data) {
      if (item.id === props.bookItem._id) {
        book = item;
        break;
      }
    }
    if (book !== []) {
        if (book.size === size) {
          await dispatch({ type: "UPDATE", id: props.bookItem._id, price: finalPrice, qty: qty })
          return
        }
        else if (book.size !== size) {
        await dispatch({type:"ADD",id:props.bookItem._id, name: props.bookItem.name, price: finalPrice, qty: qty, size:size})
        return
        }
        //console.log(data)
        return
    }
        await dispatch({type:"ADD",id:props.bookItem._id, name: props.bookItem.name, price: finalPrice, qty: qty, size:size})
    }

    
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    let finalPrice = qty * parseInt(options[size]);

    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.bookItem.img} className="card-img-top" alt="..." style={{ height: "145px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.bookItem.name}</h5>
                    {/* <p className="card-text">Out text</p> */}
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {/* <option value="old">Old</option>
                            <option value="new">New</option> */}
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>

                            })}
                        </select>

                        <div className='d-inline h-100 fs-5'>
                            Rs.{finalPrice}/-
                        </div>
                    </div>
                    <hr>
                    </hr>
                    <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
                </div>

            </div>
        </div>
    )
}
