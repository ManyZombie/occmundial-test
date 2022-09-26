import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { getPokemons, getPokemon, selectPokemonEntries, selectPokemons, selectPokemon } from '../store/pokemons.slice'

export function Pokemons() {
  const dispatch = useAppDispatch()

  const pokemons = useAppSelector(selectPokemons)

  const pokemon = useAppSelector(selectPokemon)

  const pokemonEntries = useAppSelector(selectPokemonEntries)

  useEffect(() => {
    dispatch(getPokemons(1))
    dispatch(getPokemon('ditto'))
  }, [])

  return (<div>
    <div>{pokemon ? pokemon.data?.sprites.front_default : null }</div>
    { pokemons.data.map((pokemon) => <img key={pokemon.id} src={pokemon.sprites.front_default}/>)}
  </div>)
}