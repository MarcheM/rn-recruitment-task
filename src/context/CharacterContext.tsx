import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CharacterContextType {
  likedCharacterIds: Set<string>;
  toggleCharacterId: (id: string) => void;
}

export const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

interface CharacterProviderProps {
  children: ReactNode;
}

export const CharacterProvider: React.FC<CharacterProviderProps> = ({ children }): JSX.Element => {
  const [likedCharacterIds, setLikedCharactersIds] = useState<Set<string>>(new Set());

  const toggleCharacterId = (id: string) => {
    setLikedCharactersIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const value = {
    likedCharacterIds,
    toggleCharacterId
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
};