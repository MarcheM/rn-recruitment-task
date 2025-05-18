import {View, Text, FlatList} from 'react-native';
import React, {useMemo} from 'react';
import {styles} from './FavoriteCharacters.styled';
import AppLayout from "../../../../components/AppLayout";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {fetchData} from "../../../../api/api";
import {CharacterList} from "../../../../types/Character";
import {useCharacterContext} from "../../../../context/CharacterContext";
import CharacterCard from "../CharacterList/CharacterCard/CharacterCard";

const FavoriteCharactersScreen = () => {
   const {likedCharacterIds, toggleCharacterId} = useCharacterContext();
    const {
        data,
    } = useQuery({
        queryKey: ['characters'],
        queryFn: ({ pageParam = 1 }) => fetchData<CharacterList>(`character?page=${pageParam}`),
    });

    const likedCharacters = useMemo(()=>{
        return data?.results?.filter((character)=>{
            return likedCharacterIds.has(character.id.toString());
        })
    }, [likedCharacterIds, data])

  return (
    <AppLayout>
        <Text style={styles.header}>Characters</Text>
        <FlatList
            data={likedCharacters}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <CharacterCard character={item} />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>No liked characters</Text>}
        />
    </AppLayout>
  );
};

export default FavoriteCharactersScreen;
