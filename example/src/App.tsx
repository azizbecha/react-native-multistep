import { StyleSheet, View, Text } from 'react-native';
import { MultiStepForm } from 'react-native-multistep';

const stepsComponents = [
  <View>
    <Text>Step 1</Text>
  </View>,
  <View>
    <Text>Step 2</Text>
  </View>,
  <View>
    <Text>Step 3</Text>
  </View>,
  <View>
    <Text>Step 4</Text>
  </View>,
];

export default function App() {
  return (
    <View style={styles.container}>
      <MultiStepForm
        stepsContent={stepsComponents}
        backButtonLabel="Go back"
        doneButtonLabel="Finish"
        nextButtonLabel="Next"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
