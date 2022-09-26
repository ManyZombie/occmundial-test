import styles from './Pagination.module.scss'

interface PaginationProps {
  previous: () => void
  next: () => void
}

export function Pagination({ previous, next }: PaginationProps) {
  return (
    <div className={styles.container}>
      <button className={styles['pagination-button']} onClick={() => previous()}>Anterior</button>
      <button className={styles['pagination-button']} onClick={() => next()}>Siguiente</button>
    </div>
  )
}