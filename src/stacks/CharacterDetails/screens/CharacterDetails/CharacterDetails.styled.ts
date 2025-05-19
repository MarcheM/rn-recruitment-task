import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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