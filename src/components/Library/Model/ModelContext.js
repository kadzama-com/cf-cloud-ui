import { useState, createContext } from 'react';


export const ModelContext = createContext();

export function useModel() {
  const [currentModel, setCurrentModel] = useState(null);

  const cleanCurrentModel = () => {
    setCurrentModel(null);
  };

  return {
    currentModel,
    setCurrentModel,
    cleanCurrentModel
  }
}