import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

import type { MultiStepFormProps } from './types';
import { BACK, DONE, NEXT } from './constants';
import { styles } from './styles';

export const MultiStepForm = forwardRef<
  { goToStep: (step: number) => void }, // Exposed methods via ref
  MultiStepFormProps
>(
  (
    {
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
    },
    ref
  ) => {
    const totalSteps = stepsContent.length;
    const [step, setStep] = useState<number>(1);

    if (totalSteps === 0 || !stepsContent) {
      throw new Error('Missing steps content');
    }

    // Step transition animations
    const [scaleAnim] = useState(new Animated.Value(1));

    const changeStep = (direction: 'next' | 'previous') => {
      setStep((prevStep) => {
        const newStep =
          direction === 'next'
            ? Math.min(prevStep + 1, totalSteps)
            : Math.max(prevStep - 1, 1);

        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(scaleAnim, {
            toValue: 1,
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

    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
      goToStep: (targetStep: number) => {
        setStep(Math.min(Math.max(targetStep, 1), totalSteps));
        onStepChange?.(targetStep);
      },
    }));

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
                      { transform: [{ scale: isCurrent ? scaleAnim : 1 }] },
                    ]
                  : inactiveStepStyle,
              ]}
            >
              <Text
                style={[styles.stepText, isActive && styles.activeStepText]}
              >
                {i + 1}
              </Text>
            </Animated.View>
            {i + 1 < totalSteps && (
              <View style={[styles.line, i + 1 < step && styles.activeLine]} />
            )}
          </View>
        );
      });
    }, [
      step,
      totalSteps,
      activeStepStyle,
      inactiveStepStyle,
      scaleAnim,
      stepsContainerStyle,
    ]);

    return (
      <View style={[styles.container, style]}>
        {/* Fixed Steps Indicator */}
        <View style={styles.indicatorContainer}>{stepIndicators}</View>

        {/* Centered Content */}
        <Animated.View style={[styles.contentContainer, contentContainerStyle]}>
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
  }
);
