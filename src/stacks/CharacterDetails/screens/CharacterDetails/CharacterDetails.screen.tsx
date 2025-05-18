import {Pressable, StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native';
import React, { useEffect } from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CharacterDetailsStackParamList, CharacterDetailsStackNavigationProp} from '../../CharacterDetails.routes';
import AppLayout from "../../../../components/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../../api/api";
import { CharacterDetail } from "../../../../types/Character";
import {useCharacterContext} from "../../../../context/CharacterContext";

type CharacterDetailsScreenRouteProp = RouteProp<
  CharacterDetailsStackParamList,
  'CharacterDetailsScreen'
>;

const CharacterDetailsScreen: React.FC = () => {
  const route = useRoute<CharacterDetailsScreenRouteProp>();
  const { characterId } = route.params;
  const navigation = useNavigation<CharacterDetailsStackNavigationProp>();
  const { likedCharacterIds, toggleCharacterId } = useCharacterContext();

  const { data, isPending, isLoading, isError } = useQuery({
    queryKey: ['characterDetails', characterId],
    queryFn: async () => {
       return fetchData<CharacterDetail>(`character/${characterId}`);
    },
  });

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

  const isLiked = likedCharacterIds.has(data.id.toString());

  return (
    <AppLayout>
      <ScrollView>
      <Pressable
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.navigationButtonText}>
          ← Go back to Characters List
        </Text>
      </Pressable>
      <View style={styles.card}>
        <Image source={{ uri: data.image }} style={styles.image}/>
        <View style={styles.propertiesSection}>
          <View>
            <Text style={styles.sectionLabel}>Name</Text>
            <Text style={styles.bigHeader}>{data.name}</Text>
          </View>
          <View>
          <View style={styles.sectionWrapper}>
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>status</Text>
                <Text style={styles.sectionText}>{data.status}</Text>
              </View>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>origin</Text>
              <Text style={styles.sectionText}>{data.origin.name}</Text>
            </View>
          </View>
          <View style={styles.sectionWrapper}>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>species</Text>
              <Text style={styles.sectionText}>{data.species}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>gender</Text>
              <Text style={styles.sectionText}>{data.gender}</Text>
            </View>
          </View>
          </View>
          </View>
        <TouchableOpacity style={styles.button} onPress={()=>toggleCharacterId(data.id.toString())}>
          {isLiked ?
              <><Image source={require('../../../../../assets/icons/FilledStar.png')}/>
                <Text style={styles.buttonText}>Remove from liked</Text>
              </>
              :
              <>
                <Image source={require('../../../../../assets/icons/WhiteStar.png')}/>
                <Text style={styles.buttonText}>Add to liked</Text>
              </>
          }
        </TouchableOpacity>
      </View>
      </ScrollView>
    </AppLayout>
  );
};

export default CharacterDetailsScreen;

const styles = StyleSheet.create({
  card:{
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#224229',
    borderRadius: 24,
    shadowColor: '#224229',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    overflow: 'visible',
    padding: 24,
    marginVertical: 16,
    marginRight: 4,

  },
  navigationButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#59695C'
  },
  sectionLabel:{
    fontSize: 12,
    fontFamily: 'DMMono-Medium',
    color: '#59695C',
    textTransform: 'uppercase',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  propertiesSection: {
    marginTop: 24,
    gap: 36,
  },
  bigHeader: {
    fontSize: 36,
    fontFamily: 'Inter-Medium',
    color: '#162C1B',
  },
  sectionWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    flexWrap: 'wrap',
  },
  section:{
    backgroundColor: '#F4F6F5',
    flex: 1,
    padding: 12,
    gap:4,
    borderRadius: 10,
    marginBottom: 16,
  },
  sectionText:{
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#162C1B'
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#224229',
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 12,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 4,
  },
  buttonText:{
    color: '#fff',
    fontSize: 14,
    fontFamily: 'DMMono-Regular',
    textTransform: 'uppercase',
  }
});