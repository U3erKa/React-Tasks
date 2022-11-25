import { useState } from 'react';

export default function Clicker() {
  const [count, setCount] = useState(0);
  const [delta, setDelta] = useState(1);
  const [isIncrement, setIsIncrement] = useState(true);

  const handleClicker = (delta: number, isIncrement: boolean) => {
    setCount(isIncrement ? () => count + delta : () => count - delta);
  };
  const handleChange = (e: any) => {
    const {
      target: { value },
    } = e;
    console.log(e);
    setDelta(+value);
  };

  return (
    <>
      <button onClick={() => handleClicker(delta, isIncrement)}>Clicks: {count}</button>
      <input type='input' value={delta} onChange={handleChange} />
      <button onClick={() => setIsIncrement(() => !isIncrement)}>
        Mode: {isIncrement ? 'Increment' : 'Decrement'}
      </button>
      <p>Click effect: {isIncrement ? '+' : '-'}{delta} point(s)</p>
    </>
  );
}
