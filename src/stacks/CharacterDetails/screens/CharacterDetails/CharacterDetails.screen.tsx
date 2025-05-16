import { Pressable, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useMemo } from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CharacterDetailsStackParamList, CharacterDetailsStackNavigationProp} from '../../CharacterDetails.routes';
import AppLayout from "../../../../components/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../../api/api";
import { CharacterDetail } from "../../../../types/Character";

type CharacterDetailsScreenRouteProp = RouteProp<
  CharacterDetailsStackParamList,
  'CharacterDetailsScreen'
>;

const CharacterDetailsScreen: React.FC = () => {
  const route = useRoute<CharacterDetailsScreenRouteProp>();
  const { characterId } = route.params;
  const navigation = useNavigation<CharacterDetailsStackNavigationProp>();

  const { data, isPending, isLoading, isError } = useQuery({
    queryKey: ['characterDetails', characterId],
    queryFn: async () => {
       return fetchData<CharacterDetail>(`character/${characterId}`);
    },
  });

  console.log('isPending', isPending)
  console.log('isLoading', isLoading)
  console.log('data', data)

  if (isPending || isLoading) {
    return <AppLayout>
      <ActivityIndicator size="large" />
    </AppLayout>
  }

  if (isError) {
    return <AppLayout>
      <Text style={styles.errorText}>Something went wrong</Text>
    </AppLayout>
  }

    return (
      <AppLayout>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ padding: 16 }}
        >
          <Text style={styles.navigationButtonText}>
            ← Go back to Characters List
          </Text>
        </Pressable>
      </AppLayout>
    );
};

export default CharacterDetailsScreen;

const styles = StyleSheet.create({
  navigationButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#59695C'
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  }
});