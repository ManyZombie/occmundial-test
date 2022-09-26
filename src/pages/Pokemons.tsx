import { useEffect } from 'react'
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

  useEffect(() => {
    dispatch(getPokemons(1))
    dispatch(getPokemon('ditto'))
  }, [])

  return (
    <div>
      <h6>Pokédex</h6>
      <div className={styles["pokemon-list"]}>
        { pokemons.data.map((pokemon) => 
          <PokemonResume 
            key={pokemon.id} 
            pokemon={pokemon} 
            onClick={onPokemonDetails}
          />)
        }
      </div>
    </div>

  )
}