import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
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
  },
  filterButton: {
    backgroundColor: '#224229',
    borderRadius: 22,
    paddingVertical: 8,
    paddingRight: 16,
    paddingLeft: 24,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  filterButtonActive:{
    backgroundColor: '#162C1B'
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'DMMono-Regular',
    letterSpacing: 1,
  },
  filtersPanel: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#224229',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#224229',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    overflow: 'visible',
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: 'DMMono-Medium',
    color: '#59695C',
    marginBottom: 8,
    marginTop: 8,
    letterSpacing: 1,
  },
  filterWrapper: {
    gap: 16,
    marginBottom: 8,
  },
  row: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterLine: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'DMMono-Regular',
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#224229',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#224229',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButtonText: {
    color: '#224229',
    fontSize: 14,
    fontFamily: 'DMMono-Regular',
    textTransform: 'uppercase',
  },
  icon:{
    width: 16,
    height: 16,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markedIcon: {
    backgroundColor: '#162C1B',
  },
  unmarkedIcon: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#162C1B',
  }
})