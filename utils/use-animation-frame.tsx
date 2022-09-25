import { useCallback, useRef, useEffect } from "react";

const useAnimationFrame = (enabled: boolean, callback: () => void) => {
  const requestRef = useRef<null | ReturnType<typeof requestAnimationFrame>>(
    null
  );

  const animate = useCallback(() => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  }, [callback, requestRef]);

  useEffect(() => {
    if (enabled) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) {
          return cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [enabled, animate, requestRef]);
};

export default useAnimationFrame;
