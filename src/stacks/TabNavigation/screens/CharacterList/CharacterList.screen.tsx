import { Text, FlatList, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './CharacterList.styled';
import AppLayout from "../../../../components/AppLayout";
import CharacterCard from "./CharacterCard/CharacterCard";
import InputFilter from "../../../../components/InputFilter";
import { useCharactersList } from '../../../../hooks/useCharactersList';
import { useCharacterContext } from '../../../../context/CharacterContext';
import { FiltersPanel } from '../../../../components/FiltersPanel';

const CharacterListScreen = () => {
  const { searchName, setSearchName } = useCharacterContext();

  const handleChange = (value: string) => {
    setSearchName(value);
  };

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useCharactersList();

  const allCharacters = data?.pages.flatMap(page => page.results) ?? [];

  const handleLoadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  if (isPending && allCharacters.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Something went wrong</Text>
      </View>
    );
  }

  return (
    <AppLayout>
      <Text style={styles.header}>Characters</Text>
      <InputFilter value={searchName} setValue={handleChange} />
      <FiltersPanel />
      <FlatList
        data={allCharacters}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <CharacterCard character={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListFooterComponent={() => 
          isFetchingNextPage ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator />
            </View>
          ) : null
        }
      />
    </AppLayout>
  );
};

export default CharacterListScreen;
