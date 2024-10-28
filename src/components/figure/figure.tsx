import styles from './figure.module.css';

type FigureProps = {
  amount: number;
}

export function chunkArray<T>(array: Array<T>, n: number){
  const chunkLength = Math.max(array.length / n, 1);
  const chunks = [];

  for (var i = 0; i < n; i++) {
    if(chunkLength * (i + 1) <= array.length) {
      chunks.push(array.slice(chunkLength * i, chunkLength * (i + 1)));
    }
  }

  return chunks; 
}

export function Figure({ amount }: FigureProps) {
  const amountArray = Array.from(Array(amount).keys());
  const splice = amountArray.splice(10);

  return (
    <div className={styles.wrapper}>
      <div className={styles.figure}>
        { amountArray.map((n) => (
          <div key={n} className={styles.circle}/>
        ))}
      </div>
      
      { splice.length > 0 && (
        <div className={styles.figure}>
          { splice.map((n) => (
            <div key={n} className={styles.circle}/>
          ))}
        </div>
      )}
    </div>
  );
}
