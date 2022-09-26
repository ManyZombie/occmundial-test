import { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Pagination } from '../components/Pagination'
import { PokemonResume } from '../components/PokemonResume'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { getPokemons, getPokemon, selectPokemonEntries, selectPokemons, selectPokemon } from '../store/pokemons.slice'
import { useNavigate } from 'react-router-dom'
import styles from './Pokemons.module.scss'
import { Pokemon } from '../types/Pokemon'

export function Pokemons() {
  const dispatch = useAppDispatch()

  const pokemons = useAppSelector(selectPokemons)

  const pokemonEntries = useAppSelector(selectPokemonEntries)

  const navigation = useNavigate()

  function onPokemonDetails(pokemon: Pokemon) {
    navigation(`/pokemon/${pokemon.name}`)
    dispatch(getPokemon(pokemon))
  }

  async function next() {
    if (!pokemonEntries) return
    if (!pokemonEntries.next) return
    await dispatch(getPokemons(pokemonEntries.next))
    window.scrollTo(0, 0)
  }

  async function previous() {    
    if (!pokemonEntries) return
    if (!pokemonEntries.previous) return
    await dispatch(getPokemons(pokemonEntries.previous))
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (pokemons.data.length > 0) return
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
            onClick={() => onPokemonDetails(pokemon)}
          />)
        }
      </div>
      
      { pokemonEntries ?
        <div className={styles["pokemon-pagination"]} >
          <Pagination next={next} previous={previous}/>
        </div> : null
      }

    </div>

  )
}