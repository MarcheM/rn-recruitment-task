import { Text, FlatList, ActivityIndicator, View } from 'react-native';
import React from 'react';
import { styles } from './CharacterList.styled';
import AppLayout from "../../../../components/AppLayout";
import CharacterCard from "./CharacterCard/CharacterCard";
import { CharacterList } from '../../../../types/Character';
import { fetchData } from "../../../../api/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import Filter from "../../../../components/Filter";

const CharacterListScreen = () => {
  const [searchedName, setSearchedName] = React.useState('');
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['characters'],
    queryFn: ({ pageParam = 1 }) => fetchData<CharacterList>(`character?page=${pageParam}`),
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) {
        return undefined;
      }
      const nextUrl = new URL(lastPage.info.next);
      const nextPage = nextUrl.searchParams.get('page');
      return nextPage ? parseInt(nextPage) : undefined;
    },
    initialPageParam: 1,
  });

  const allCharacters = data?.pages.flatMap(page => page.results) ?? [];

  const handleLoadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  if (isPending) {
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
      <Filter value={searchedName} setValue={setSearchedName}></Filter>
      <FlatList
        data={allCharacters}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <CharacterCard character={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
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
