import styles from './answer.module.css';

type AnswerProps = {
  onClick: (answer: number) => void;
  amount: number;
}

export function Answer({ onClick, amount }: AnswerProps) {
  const amountArray = Array.from(Array(amount).keys());

  return (
    <div className={styles.answers}>
      { amountArray.map((a) => (
        <button key={a} className={styles.answer} onClick={() => onClick(a + 1)}>{a + 1}</button>
      ))}
    </div>
  );
}
