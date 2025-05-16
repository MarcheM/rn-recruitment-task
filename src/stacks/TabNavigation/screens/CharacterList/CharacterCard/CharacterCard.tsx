import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {CharacterDetail} from "../../../../../types/Character";
import {styles} from "./CharacterCard.styled";
import { useCharacterContext } from "../../../../../context/CharacterContext";
import {useNavigation} from "@react-navigation/native";
import {MainStackNavigationProp} from "../../../../Main/Main.routes";

const starIcon = require('../../../../../../assets/icons/Star.png');
const filledStarIcon = require('../../../../../../assets/icons/FilledStar.png');

type CharacterKeys = 'name' | 'status' | 'species';
interface Props {
    character: CharacterDetail
}

const CharacterCard: React.FC<Props> = ({character}) => {
    const {navigate} = useNavigation<MainStackNavigationProp>();
    const { likedCharacterIds, toggleCharacterId } = useCharacterContext();
    const isLiked = likedCharacterIds.has(character.id.toString());

    const handleLikePress = () => {
        toggleCharacterId(character.id.toString());
    };

    return (
    <TouchableOpacity
        onPress={(): void => {
            navigate('CharacterDetailsStack', {
                screen: 'CharacterDetailsScreen',
                params: {
                    characterId: character.id
                }
            });
        }}
        style={styles.card}>
        <View style={styles.sectionWrapper}>
            {(['name', 'status', 'species'] as CharacterKeys[]).map((section)=> (
                 <View style={styles.smallGap} key={section}>
                    <Text style={styles.sectionLabel}>{section}</Text>
                    <Text style={styles.sectionText}>{character[section]}</Text>
                 </View>
                )
            )}
        </View>
        <View>
            <Image source={{ uri: character.image }} style={styles.image}/>
            <TouchableOpacity 
                style={[styles.likeButton, isLiked && styles.likedButton]}
                onPress={handleLikePress}
            >
                <Image source={isLiked ? filledStarIcon : starIcon} />
                <Text style={styles.likeButtonText}>
                    Like
                </Text>
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
    )
 }

export default CharacterCard