import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CharacterContextType {
  likedCharacterIds: Set<string>;
  toggleLikedCharacter: (id: string) => void;
  searchName: string;
  setSearchName: (name: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  speciesFilter: string;
  setSpeciesFilter: (species: string) => void;
  appliedStatusFilter: string;
  setAppliedStatusFilter: (status: string) => void;
  appliedSpeciesFilter: string;
  setAppliedSpeciesFilter: (species: string) => void;
  appliedSearchName: string;
  setAppliedSearchName: (name: string) => void;
}

export const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

interface CharacterProviderProps {
  children: ReactNode;
}

export const CharacterProvider: React.FC<CharacterProviderProps> = ({ children }): JSX.Element => {
  const [likedCharacterIds, setLikedCharactersIds] = useState<Set<string>>(new Set());
  const [searchName, setSearchName] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [appliedStatusFilter, setAppliedStatusFilter] = useState('');
  const [appliedSpeciesFilter, setAppliedSpeciesFilter] = useState('');
  const [appliedSearchName, setAppliedSearchName] = useState('');

  const toggleLikedCharacter = (id: string) => {
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
    toggleLikedCharacter,
    searchName,
    setSearchName,
    showFilters,
    setShowFilters,
    statusFilter,
    setStatusFilter,
    speciesFilter,
    setSpeciesFilter,
    appliedStatusFilter,
    setAppliedStatusFilter,
    appliedSpeciesFilter,
    setAppliedSpeciesFilter,
    appliedSearchName,
    setAppliedSearchName
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