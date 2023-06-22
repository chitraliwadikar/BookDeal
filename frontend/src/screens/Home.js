import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Card from '../Components/Card'
//import Carousel from '../Components/Carousel'

export default function Home() {
  const [search, setSearch] = useState('');
  const [bookCat, setBookCat] = useState([]);
  const [bookItem, setBookItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/bookData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setBookItem(response[0])
    setBookCat(response[1])
    //console.log(response[0], response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div >
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "9" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2 w-75 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://tagatavdc.tagari.com/1663760339377.jpg" className="d-block w-100" style={{ filter: "brightness(50%)"}} alt="..."></img>
            </div>
            <div className="carousel-item">
              <img src="https://library.tscollege.org/img/carousel-2.jpg" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..."></img>
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?books" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..."></img>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          bookCat !== []
            ? bookCat.map((data) => {
              return (<div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {bookItem !== []
                  ?
                  bookItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                          <Card bookItem={filterItems}
                            options={filterItems.options[0]}

                          ></Card>
                        </div>

                      )
                    }) : <div> No such Data found</div>}
              </div>
              )
            })
            : <div>-----------------------</div>
        }

      </div>
      <div><Footer /></div>
    </div>
  )
}
