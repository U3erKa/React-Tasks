import { useState, useEffect } from 'react';

export default function Clicker() {
  const [count, setCount] = useState(0);
  const [delta, setDelta] = useState(1);
  const [isIncrement, setIsIncrement] = useState(true);
  const [clickInterval, setClickInterval] = useState(1000);
  const [isAuto, setIsAuto] = useState(false);

  const handleClicker = (delta: number, isIncrement: boolean) => {
    setCount(isIncrement ? () => count + delta : () => count - delta);
  };
  const handleAutoclicker = () => {
    setIsAuto(() => !isAuto);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setDelta(+value);
  };
  const handleAutoclickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setClickInterval(+value);
  };

  useEffect(() => {
    handleAutoclicker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let timerId: string | number | NodeJS.Timeout | undefined;
    if (isAuto) {
      timerId = setTimeout(() => {
        handleClicker(delta, isIncrement);
      }, clickInterval);
    }
    return () => {
      clearInterval(timerId);
    };
  });

  return (
    <div>
      <button onClick={() => handleClicker(delta, isIncrement)}>Clicks: {count}</button>
      <input type="input" value={delta} onChange={handleChange} />
      <button onClick={() => setIsIncrement(() => !isIncrement)}>
        Mode: {isIncrement ? 'Increment' : 'Decrement'}
      </button>
      <button onClick={handleAutoclicker}>Autoclicker: {isAuto ? 'ON' : 'OFF'}</button>
      <input type="input" value={clickInterval} onChange={handleAutoclickerChange} />
      <p>
        Click effect: {isIncrement ? '+' : '-'}
        {delta} point(s)
      </p>
      <p>Autoclicker interval: {clickInterval}</p>
    </div>
  );
}
