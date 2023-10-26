'use client'

import { useEffect, useRef, useState, useMemo } from 'react';
import clsx from 'clsx';

import { useApp } from '@/services/app-context';
import { Figure } from '@/components/figure';
import { Answer } from '@/components/answer';

import styles from './page.module.css';

type State = 'start'|'figure'|'answer'|'result'|'end';

export default function Home() {
  const [state, setState] = useState<State>('start');

  // const { lives, loseLife } = useApp();

  const amountRef = useRef<number>(1);
  const resultRef = useRef<number>(1);
  const lifesRef = useRef<number>(3);
  const timeoutRef = useRef<number>(2000);
  const counterRef = useRef<number>(0);

  function restartHandler() {
    counterRef.current = 0;
    timeoutRef.current = 2000;
    lifesRef.current = 3;

    setState('start');
  }

  function startHandler() {
    amountRef.current = Math.floor(Math.random() * 10) + 1;
    setState('figure');
  }

  function answerHandler(r: number) {
    setState('result');
    resultRef.current = r;

    if (r === amountRef.current) {
      counterRef.current += 1;
    } else {
      // loseLife();
      lifesRef.current -= 1;
    }

    timeoutRef.current = timeoutRef.current * 0.95;
  }

  useEffect(() => {
    if (state !== 'figure') return;

    window.setTimeout(() => {
      setState('answer');
    }, timeoutRef.current);
  }, [state]);

  return (
    <div className={ clsx(styles.app, { 
      [styles.correct]: state === 'result' && resultRef.current === amountRef.current,
      [styles.incorrect]: state === 'result' && resultRef.current !== amountRef.current,
    })}>
      { (state === 'start') && <button className={styles.start} onClick={startHandler}>Start</button> }
      { (state === 'figure') && <Figure amount={amountRef.current} /> }
      { (state === 'answer') && <Answer amount={10} onClick={answerHandler} /> }
      { (state === 'result') && (
        <div>
          <div className={styles.result}>
            { resultRef.current === amountRef.current ? <>😁</> : <>😞</> }
          </div>

          <div className={styles.result}>
            { amountRef.current }
          </div>

          { lifesRef.current > 0 && (
            <button className={styles.start} onClick={startHandler}>volgende</button>
          )}

          { lifesRef.current === 0 && (
            <>
              <div className={styles.end}>{ counterRef.current } goede antwoorden!</div>
              <button className={styles.start} onClick={restartHandler}>herstarten</button>
            </>
          )}
        </div>
      )}

      <div className={styles.lifes}>
        { Array.from(Array(lifesRef.current).keys()).map((k) => (
          <div key={k}>❤️</div>
        ))}
      </div>
    </div>
  );
}
