import styles from './figure.module.css';

type FigureProps = {
  amount: number;
}

export function Figure({ amount }: FigureProps) {
  const amountArray = Array.from(Array(amount).keys());

  return (
    <div className={styles.figure}>
      { amountArray.map((n) => (
        <div key={n} className={styles.circle}/>
      ))}
    </div>
  );
}
