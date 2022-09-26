import { useEffect } from 'react'
import { selectPokemon, getPokemon } from '../store/pokemons.slice'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { PokemonResume } from '../components/PokemonResume'
import { Navbar } from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Pokemon.module.scss'

export function Pokemon() {

  const pokemon = useAppSelector(selectPokemon)

  const dispatch = useAppDispatch()

  const navigation = useNavigate()

  const id = useParams().id!
  
  useEffect(() => {
    if (pokemon.data) return
    dispatch(getPokemon(id))
  }, [])

  return (
    <div>
      <Navbar></Navbar>
      <button className={styles['back-button']}>Regresar</button>
      <div className={styles['pokemon-details']}>
        { pokemon.data ? <PokemonResume pokemon={pokemon.data}/> : null}
      </div>
    </div>
  )
}