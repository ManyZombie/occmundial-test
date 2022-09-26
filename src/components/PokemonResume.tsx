import { Pokemon } from "../types/Pokemon"
import { capitalize } from 'lodash-es'
import styles from './PokemonResume.module.scss'


export interface PokemonResumeProps {
  pokemon: Pokemon
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => any
}

export function PokemonResume({pokemon, onClick}: PokemonResumeProps) {
  return (
    <div className={styles.card} onClick={(event) => onClick?.(event)} data-type={pokemon.types[0].type.name}>
      <div>
        <div>#{String(pokemon.id).padStart(4, '0')}</div>
        <div className={styles['pokemon-name']}>{capitalize(pokemon.name)}</div>
        <div>
          { pokemon.types.map((type) => 
            <span 
              className={styles['pokemon-type']} 
              key={type.type.name} 
              data-type={type.type.name}
              >{capitalize(type.type.name)}
            </span>) 
          }
        </div>
      </div>

      <img  key={pokemon.id} src={pokemon.sprites.front_default}/>

    </div>
  )
}