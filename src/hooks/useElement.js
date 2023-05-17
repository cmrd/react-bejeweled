import { useRef } from "react";

const useElement = () => {

  const firstElement = useRef(null)
  const lastElement = useRef(null)

  return [firstElement, lastElement]

}

export default useElement