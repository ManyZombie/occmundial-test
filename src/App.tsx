import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Pokemons } from './pages/Pokemons'
import { Pokemon } from './pages/Pokemon'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Pokemons />}/>
        <Route path='/pokemon/:id' element={<Pokemon />}/>
      </Routes>
  )
}

export default App
