import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

import { BACK, DONE, NEXT, PRIMARY, SECONDARY } from './constants';
import type { MultiStepFormProps } from './types';

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  stepsContent,
  onStepChange,
  onStepForward,
  onStepBackward,
  backButtonLabel = BACK,
  nextButtonLabel = NEXT,
  doneButtonLabel = DONE,
  onComplete,
  style,
  nextButtonStyle,
  previousButtonStyle,
  doneButtonStyle,
  stepsContainerStyle,
  activeStepStyle,
  inactiveStepStyle,
  contentContainerStyle,
  buttonsContainerStyle,
}) => {
  const totalSteps = stepsContent.length;
  const [step, setStep] = useState<number>(1);

  // Step transition animations
  const [scaleAnim] = useState(new Animated.Value(1)); // Scale animation for the active step circle

  const changeStep = (direction: 'next' | 'previous') => {
    setStep((prevStep) => {
      const newStep =
        direction === 'next'
          ? Math.min(prevStep + 1, totalSteps)
          : Math.max(prevStep - 1, 1);

      // Animate the active step circle (scale effect)
      Animated.timing(scaleAnim, {
        toValue: 1.1, // Increase size to 1.5x when active
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(scaleAnim, {
          toValue: 1, // Reset back to normal size
          duration: 200,
          useNativeDriver: true,
        }).start();
      });

      direction === 'next'
        ? onStepForward?.(newStep)
        : onStepBackward?.(newStep);
      onStepChange?.(newStep);
      if (newStep === totalSteps) onComplete?.(newStep);

      return newStep;
    });
  };

  const stepIndicators = React.useMemo(() => {
    return Array.from({ length: totalSteps }, (_, i) => {
      const isActive = i + 1 <= step;
      const isCurrent = i + 1 === step;

      return (
        <View key={i} style={[styles.stepContainer, stepsContainerStyle]}>
          <Animated.View
            style={[
              styles.stepIndicator,
              isActive
                ? [
                    styles.activeStep,
                    activeStepStyle,
                    { transform: [{ scale: isCurrent ? scaleAnim : 1 }] }, // Apply scale animation
                  ]
                : inactiveStepStyle,
            ]}
          >
            <Text style={[styles.stepText, isActive && styles.activeStepText]}>
              {i + 1}
            </Text>
          </Animated.View>
          {i + 1 < totalSteps && (
            <View style={[styles.line, i + 1 < step && styles.activeLine]} />
          )}
        </View>
      );
    });
  }, [step, totalSteps, activeStepStyle, inactiveStepStyle, scaleAnim]);

  return (
    <View style={[styles.container, style]}>
      {/* Fixed Steps Indicator */}
      <View style={styles.indicatorContainer}>{stepIndicators}</View>

      {/* Centered Content */}
      <Animated.View
        style={[styles.contentContainer, contentContainerStyle]} // Apply the fade animation
      >
        {stepsContent[step - 1]}
      </Animated.View>

      {/* Fixed Bottom Buttons */}
      <View style={[styles.fixedFooter, buttonsContainerStyle]}>
        {/* Previous Button */}
        {step > 1 && (
          <TouchableOpacity
            onPress={() => changeStep('previous')}
            style={[styles.button, styles.backButton, previousButtonStyle]}
          >
            <Text style={styles.backButtonText}>{backButtonLabel}</Text>
          </TouchableOpacity>
        )}

        {/* Next or Done Button */}
        <TouchableOpacity
          onPress={() => changeStep('next')}
          style={[
            styles.button,
            styles.nextButton,
            step < totalSteps ? nextButtonStyle : doneButtonStyle,
          ]}
        >
          <Text style={styles.nextButtonText}>
            {step < totalSteps ? nextButtonLabel : doneButtonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  indicatorContainer: {
    flexDirection: 'row',
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
    paddingTop: 30, // Offset for fixed header
    paddingBottom: 0, // Offset for fixed footer
  },
  centeredContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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