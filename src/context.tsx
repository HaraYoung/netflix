import { createContext } from 'react';

interface ItypeContext{
    type: string;
    setType: (type : string) => void;
}

export const TypeContext = createContext<ItypeContext>({
    type: '',
    setType: () => {},
  });

