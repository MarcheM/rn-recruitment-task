import React, { useMemo } from 'react';
import { Text, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import AppLayout from '../../../../components/AppLayout';
import { fetchData } from '../../../../api/api';
import { CharacterDetail } from '../../../../types/Character';
import { useCharacterContext } from '../../../../context/CharacterContext';
import CharacterCard from '../CharacterList/CharacterCard/CharacterCard';
import InputFilter from '../../../../components/InputFilter';
import { FiltersPanel } from '../../../../components/FiltersPanel';

import { styles } from './FavoriteCharacters.styled';

const FavoriteCharactersScreen = () => {
    const {
        likedCharacterIds,
        appliedSearchName,
        appliedStatusFilter,
        appliedSpeciesFilter,
        searchName,
        setSearchName,
    } = useCharacterContext();

    const ids = Array.from(likedCharacterIds).join(',');
    const endpoint = ids ? `/character/[${ids}]` : '';

    const { data } = useQuery({
        queryKey: ['favorite-characters', ids],
        enabled: ids.length > 0,
        queryFn: () => fetchData<CharacterDetail[]>(endpoint),
    });

    const filteredCharacters = useMemo(() => {
        return data?.filter((character) =>
            character.name.toLowerCase().includes(appliedSearchName.toLowerCase()) &&
            (appliedStatusFilter ? character.status.toLowerCase() === appliedStatusFilter.toLowerCase() : true) &&
            (appliedSpeciesFilter ? character.species === appliedSpeciesFilter : true)
        );
    }, [data, appliedSearchName, appliedStatusFilter, appliedSpeciesFilter]);

    return (
        <AppLayout>
            <Text style={styles.header}>Characters</Text>
            <InputFilter value={searchName} setValue={setSearchName} />
            <FiltersPanel />
            <FlatList
                data={filteredCharacters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CharacterCard character={item} />}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text>No liked characters</Text>}
            />
        </AppLayout>
    );
};

export default FavoriteCharactersScreen;
