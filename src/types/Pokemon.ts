export interface Pokemon {
  id: number,
  sprites: {
    front_default: string;
  };
  types: {
    slot: number,
    type: {
      name: "grass",
      url: "https://pokeapi.co/api/v2/type/12/"
    }
  } []
}