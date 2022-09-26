import { PokemonEntry } from './PokemonEntry'

export interface PokemonEntries {
  count: number;
  next: string;
  previous: null;
  results: PokemonEntry[];
}
