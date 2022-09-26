import styles from './Navbar.module.scss'

export function Navbar() {
  return (      
    <nav className={styles.navbar}>
      <h6 className={styles.title}>Pokédex</h6>
    </nav>
  )
}