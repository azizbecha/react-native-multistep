import type { StyleProp, ViewStyle } from 'react-native';

export type MultiStepFormProps = {
  stepsContent: React.ReactNode[];
  backButtonLabel?: string;
  nextButtonLabel?: string;
  doneButtonLabel?: string;
  onStepChange?: (currentStep: number) => void; // Optional callback when the step changes
  onStepForward?: (currentStep: number) => void;
  onStepBackward?: (currentStep: number) => void;
  onComplete?: (currentStep: number) => void; // Optional callback when the form is completed
  style?: StyleProp<ViewStyle>;
  nextButtonStyle?: StyleProp<ViewStyle>;
  previousButtonStyle?: StyleProp<ViewStyle>;
  doneButtonStyle?: StyleProp<ViewStyle>;
  stepsContainerStyle?: StyleProp<ViewStyle>;
  activeStepStyle?: StyleProp<ViewStyle>;
  inactiveStepStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  buttonsContainerStyle?: StyleProp<ViewStyle>;
  lineColor?: string;
  activeLineColor?: string;
};
