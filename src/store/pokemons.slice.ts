import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Pokemon } from '../types/Pokemon'
import { PokemonEntries } from '../types/PokemonEntries'
import { RootState } from './index'
import { getPokemonDetails, getPokemons as getPokemonService } from '../services/pokemon.service'

interface RemoteData<T> {
  data: T
  loading: boolean
}

export interface PokemonsState {
  pokemonEntries: PokemonEntries | null
  pokemons: RemoteData<Pokemon[] > 
  pokemon: RemoteData<Pokemon | null>  
}

const initialState: PokemonsState = {
  pokemonEntries: null,
  pokemons: {
    data: [],
    loading: false
  },
  pokemon: {
    data: null,
    loading: false
  }
}

export const getPokemons = createAsyncThunk(
  'pokemons/getPokemons', 
  async (page: number) => getPokemonService(page),
)

export const getPokemon = createAsyncThunk(
  'pokemon/getPokemons', 
  async (param: string | number | Pokemon) => 
    typeof param === 'number' || typeof param === 'string' 
      ? getPokemonDetails(param)
      : param,
)


export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPokemons.pending, (state) => {
      state.pokemons.loading = true
    })

    builder.addCase(getPokemons.fulfilled, (state, 
      action: PayloadAction<{ pokemons: Pokemon[]; entries: PokemonEntries;}>
    ) => {
      state.pokemons.data = action.payload.pokemons
      state.pokemonEntries = action.payload.entries
      state.pokemons.loading = false
    })

    builder.addCase(getPokemons.rejected, (state) => {
      state.pokemons.loading = false
    })

    builder.addCase(getPokemon.pending, (state) => {
      state.pokemon.loading = true
    })

    builder.addCase(getPokemon.fulfilled, (state, action: PayloadAction<Pokemon>) => {
      state.pokemon.data = action.payload
      state.pokemon.loading = false
    })

    builder.addCase(getPokemon.rejected, (state) => {
      state.pokemon.loading = false
    })

  }
})


export const selectPokemons = (state: RootState) => state.pokemons.pokemons

export const selectPokemon = (state: RootState) => state.pokemons.pokemon

export const selectPokemonEntries = (state: RootState) => state.pokemons.pokemonEntries

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default pokemonsSlice.reducer