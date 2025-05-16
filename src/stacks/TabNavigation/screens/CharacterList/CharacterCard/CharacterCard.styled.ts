import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F4F6F5',
        flex: 1,
        marginRight: 4,
        padding: 10,
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 16,
        borderColor: '#224229',
        borderWidth: 1,
        shadowColor: '#224229',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
        overflow: 'visible',
    },
    sectionWrapper: {
        width: '35%',
        gap: 12,
    },
    sectionLabel: {
        fontSize: 12,
        color: '#59695C',
        textTransform: 'uppercase',
        fontFamily: 'DMMono-Medium'
    },
    sectionText: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        textTransform: 'capitalize',
    },
    image:{
        width: 200,
        height: 200,
        borderRadius: 16,
    },
    smallGap: {
        gap:4,
    },
    likeButton: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap:8,
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingRight: 16,
        paddingLeft: 12,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#224229'
    },
    likedButton: {
        backgroundColor: '#DAE4DC',
    },
    likeButtonText:{
        fontSize: 16,
        fontFamily: 'DMMono-Medium',
        textTransform: 'uppercase',
        color: '#224229',
    },
})