import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import { styles as listStyles } from '../stacks/TabNavigation/screens/CharacterList/CharacterList.styled';
import { useCharacterContext } from '../context/CharacterContext';

const STATUSES = ['Alive', 'Dead', 'Unknown'];
const SPECIES = ['Human', 'Humanoid'];

export const FiltersPanel: React.FC = () => {
    const {
        showFilters,
        setShowFilters,
        statusFilter,
        setStatusFilter,
        speciesFilter,
        setSpeciesFilter,
        searchName,
        setAppliedStatusFilter,
        setAppliedSpeciesFilter,
        setAppliedSearchName,
    } = useCharacterContext();

    const handleApply = () => {
        setAppliedStatusFilter(statusFilter);
        setAppliedSpeciesFilter(speciesFilter);
        setAppliedSearchName(searchName);
        setShowFilters(false);
    };

    const handleReset = () => {
        setStatusFilter('');
        setSpeciesFilter('');
    };

    return (
        <>
            <TouchableOpacity
                style={[
                    listStyles.filterButton,
                    showFilters && listStyles.filterButtonActive,
                ]}
                onPress={() => setShowFilters(!showFilters)}
            >
                <Text style={listStyles.filterButtonText}>
                    {showFilters ? 'FILTER ▲' : 'FILTER ▼'}
                </Text>
            </TouchableOpacity>

            {showFilters && (
                <View style={listStyles.filtersPanel}>
                    <Text style={listStyles.filterLabel}>STATUS</Text>
                    <View style={listStyles.filterWrapper}>
                        {STATUSES.map((status) => (
                            <TouchableOpacity
                                key={status}
                                onPress={() =>
                                    setStatusFilter(statusFilter === status ? '' : status)
                                }
                                style={listStyles.filterLine}
                            >
                                <View
                                    style={[
                                        listStyles.icon,
                                        statusFilter === status
                                            ? listStyles.markedIcon
                                            : listStyles.unmarkedIcon,
                                    ]}
                                >
                                    {statusFilter === status && (
                                        <Image source={require('../../assets/icons/Mark.png')} />
                                    )}
                                </View>
                                <Text>{status}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={listStyles.filterLabel}>SPECIES</Text>
                    <View style={listStyles.filterWrapper}>
                        {SPECIES.map((species) => (
                            <TouchableOpacity
                                key={species}
                                onPress={() =>
                                    setSpeciesFilter(speciesFilter === species ? '' : species)
                                }
                                style={listStyles.filterLine}
                            >
                                <View
                                    style={[
                                        listStyles.icon,
                                        speciesFilter === species
                                            ? listStyles.markedIcon
                                            : listStyles.unmarkedIcon,
                                    ]}
                                >
                                    {speciesFilter === species && (
                                        <Image source={require('../../assets/icons/Mark.png')} />
                                    )}
                                </View>
                                <Text>{species}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={listStyles.row}>
                        <TouchableOpacity
                            style={listStyles.outlineButton}
                            onPress={handleReset}
                        >
                            <Text style={listStyles.outlineButtonText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={listStyles.button}
                            onPress={handleApply}
                        >
                            <Text style={listStyles.buttonText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
};
