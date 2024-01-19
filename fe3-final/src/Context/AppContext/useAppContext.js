import { createContext, useContext } from 'react';
import { AppContext } from './AppContext';

// Definimos el contexto
// ...

// Exporta el hook useAppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de un proveedor AppContext');
  }
  return context;
};