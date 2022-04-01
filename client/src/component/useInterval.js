import {useRef, useEffect} from "react";

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    console.log("Callback")
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    console.log("tick");
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => { clearInterval(id) }
    }
  }, [delay])
}