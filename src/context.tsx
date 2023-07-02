import { createContext } from 'react';

interface ItypeContext{
    type: string;
    setType: (type : string) => void;
}

const TypeContext = createContext<ItypeContext>({
    type: '',
    setType: () => {},
  });

export default TypeContext;

