import {useEffect, useRef, useState, useCallback} from 'react';
import {v4  as uuid} from 'uuid';
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  const [id ,setId] = useState(uuid());
  // Remember the latest callback.
  savedCallback.current = callback;

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, id]);

  //This Function To Reset Time Interval Depend On Call Reset
  const reset = useCallback(()=>{
    setId(uuid());
  },[]);
  
  return reset;
}

export default useInterval;