import { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Pagination } from '../components/Pagination'
import { PokemonResume } from '../components/PokemonResume'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { getPokemons, getPokemon, selectPokemonEntries, selectPokemons, selectPokemon } from '../store/pokemons.slice'
import styles from './Pokemons.module.scss'

export function Pokemons() {
  const dispatch = useAppDispatch()

  const pokemons = useAppSelector(selectPokemons)

  const pokemon = useAppSelector(selectPokemon)

  const pokemonEntries = useAppSelector(selectPokemonEntries)

  function onPokemonDetails() {
    console.log('test');
  }

  function next() {
    if (!pokemonEntries) return
    if (!pokemonEntries.next) return
    dispatch(getPokemons(pokemonEntries.next))
  }

  function previous() {    
    if (!pokemonEntries) return
    if (!pokemonEntries.previous) return
    dispatch(getPokemons(pokemonEntries.previous))
  }

  useEffect(() => {
    dispatch(getPokemons(1))
  }, [])

  return (
    <div>

      <Navbar></Navbar>
      
      <div className={styles["pokemon-list"]}>
        { pokemons.data.map((pokemon) => 
          <PokemonResume 
            key={pokemon.id} 
            pokemon={pokemon} 
            onClick={onPokemonDetails}
          />)
        }
      </div>
      
      <div className={styles["pokemon-pagination"]} >
        <Pagination next={next} previous={previous}/>
      </div>

    </div>

  )
}