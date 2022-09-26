import { PokemonEntry } from '../types/PokemonEntry';
import { PokemonEntries } from '../types/PokemonEntries';
import { Pokemon } from '../types/Pokemon';

interface GetPokemons {
  pokemons: Pokemon[];
  entries: PokemonEntries
}

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

export async function getPokemons(param: string | number, limit?: number): Promise<GetPokemons>
export async function getPokemons(url: string, limit?: number): Promise<GetPokemons>
export async function getPokemons(offset: number, limit?: number): Promise<GetPokemons>
export async function getPokemons(param: number | string, limit: number = 20): Promise<GetPokemons> {
  let offset = 1
  if (typeof param === 'string' ) {
    const searchParams= new URL(param).searchParams
    offset = Number.parseInt(searchParams.get('offset') ?? '1')
  } else {
    offset = param
  }  
  const entries = await getPokemonEntries(offset, limit)
  const pokemonPromises = entries.results.map((entry) => getPokemonDetails(entry.name) )
  const pokemons = await Promise.all(pokemonPromises)
  return { pokemons, entries }
}
