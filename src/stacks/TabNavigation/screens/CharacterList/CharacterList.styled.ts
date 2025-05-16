import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
header:{
  fontSize: 36,
  fontWeight: 'bold',
  color: '#162C1B',
  fontFamily: 'Inter-Medium',
  marginBottom: 16
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
errorContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20
},
errorText: {
  fontSize: 16,
  color: '#224229',
  fontFamily: 'Inter-Regular',
  textAlign: 'center'
},
footerLoader: {
  paddingVertical: 20,
  alignItems: 'center'
}
});
