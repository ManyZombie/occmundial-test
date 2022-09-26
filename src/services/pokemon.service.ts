import { PokemonEntry } from '../types/PokemonEntry';
import { PokemonEntries } from '../types/PokemonEntries';
import { Pokemon } from '../types/Pokemon';


export async function getPokemonEntries(offset: number, limit: number = 20) {
  const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const data = await rawData.json()
  return data as PokemonEntries;
}


export async function getPokemonDetails(name: string | number): Promise<Pokemon> {
  const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const data = await rawData.json()
  return data as Pokemon;
}

export async function getPokemons(offset: number, limit: number = 20) {
  const entries = await getPokemonEntries(offset, limit)
  const pokemonPromises = entries.results.map((entry) => getPokemonDetails(entry.name) )
  const pokemons = await Promise.all(pokemonPromises)
  return { pokemons, entries }
}