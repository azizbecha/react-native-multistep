import { StyleSheet } from 'react-native';
import { PRIMARY, SECONDARY } from './constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: SECONDARY,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    borderColor: PRIMARY,
    backgroundColor: PRIMARY,
  },
  stepText: {
    color: SECONDARY,
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeStepText: {
    color: 'white',
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: SECONDARY,
    marginHorizontal: 10,
  },
  activeLine: {
    backgroundColor: PRIMARY,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 30,
    paddingBottom: 0,
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  backButton: {
    backgroundColor: SECONDARY,
    marginRight: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: PRIMARY,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
