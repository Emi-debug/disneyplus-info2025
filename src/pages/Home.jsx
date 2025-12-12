import React from 'react'
import Slider from '../Componets/Slider'
import ProductionHouse from '../Componets/ProductionHouse'
import GenreMovieList from '../Componets/GenreMovieList'

function Home() {
  return (
    <div>
        <Slider/>

        <ProductionHouse/>

        <GenreMovieList/>
    </div>
  )
}

export default Home