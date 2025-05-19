import React from 'react';
import {
  Pressable,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import AppLayout from '../../../../components/AppLayout';
import { fetchData } from '../../../../api/api';
import { CharacterDetail } from '../../../../types/Character';
import { useCharacterContext } from '../../../../context/CharacterContext';
import { styles } from './CharacterDetails.styled';

import {
  CharacterDetailsStackParamList,
  CharacterDetailsStackNavigationProp,
} from '../../CharacterDetails.routes';

type CharacterDetailsScreenRouteProp = RouteProp<
    CharacterDetailsStackParamList,
    'CharacterDetailsScreen'
>;

const CharacterDetailsScreen: React.FC = () => {
  const route = useRoute<CharacterDetailsScreenRouteProp>();
  const { characterId } = route.params;

  const navigation = useNavigation<CharacterDetailsStackNavigationProp>();
  const { likedCharacterIds, toggleLikedCharacter } = useCharacterContext();

  const { data, isPending, isLoading, isError } = useQuery({
    queryKey: ['characterDetails', characterId],
    queryFn: async () =>
        fetchData<CharacterDetail>(`character/${characterId}`),
  });

  if (isPending || isLoading) {
    return (
        <AppLayout>
          <ActivityIndicator size="large" />
        </AppLayout>
    );
  }

  if (isError || !data) {
    return (
        <AppLayout>
          <Text style={styles.errorText}>Something went wrong</Text>
        </AppLayout>
    );
  }

  const isLiked = likedCharacterIds.has(data.id.toString());

  return (
      <AppLayout>
        <ScrollView>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.navigationButtonText}>
              ← Go back to Characters List
            </Text>
          </Pressable>

          <View style={styles.card}>
            <Image source={{ uri: data.image }} style={styles.image} />

            <View style={styles.propertiesSection}>
              <View>
                <Text style={styles.sectionLabel}>Name</Text>
                <Text style={styles.bigHeader}>{data.name}</Text>
              </View>

              <View>
                <View style={styles.sectionWrapper}>
                  <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Status</Text>
                    <Text style={styles.sectionText}>{data.status}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Origin</Text>
                    <Text style={styles.sectionText}>{data.origin.name}</Text>
                  </View>
                </View>

                <View style={styles.sectionWrapper}>
                  <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Species</Text>
                    <Text style={styles.sectionText}>{data.species}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Gender</Text>
                    <Text style={styles.sectionText}>{data.gender}</Text>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => toggleLikedCharacter(data.id.toString())}
            >
              {isLiked ? (
                  <>
                    <Image
                        source={require('../../../../../assets/icons/FilledStar.png')}
                    />
                    <Text style={styles.buttonText}>Remove from liked</Text>
                  </>
              ) : (
                  <>
                    <Image
                        source={require('../../../../../assets/icons/WhiteStar.png')}
                    />
                    <Text style={styles.buttonText}>Add to liked</Text>
                  </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </AppLayout>
  );
};

export default CharacterDetailsScreen;
