# React Native MultiStep

A flexible and animated multi-step form component for React Native, allowing you to easily create forms with multiple steps. The component provides step indicators, transition animations, and customizable buttons.

<img src='https://github.com/user-attachments/assets/54b26c27-9b48-4cd8-aa3f-dac21306d2f4' width='250'/>
<img src='https://github.com/user-attachments/assets/2d2d1331-ce1f-41ac-adea-36c8126e0cf0' width='250'/>
<img src='https://github.com/user-attachments/assets/d034528b-8bb2-4346-827c-8904051fee9b' width='250'/>

## Features

- **Step Indicator**: Displays a dynamic indicator to show the current step and progress.
- **Animations**: Includes an animated scale effect on the active step indicator.
- **Customizable Buttons**: Custom labels and styles for the back, next, and done buttons.
- **Customizable Styles**: You can easily customize the look of each part of the form, including the content container, step indicators, buttons, etc.

## Installation

1. Install the necessary dependencies:

```bash
npm install react-native-multistep
```

or

```bash
yarn add react-native-multistep
```

2. Import the `MultiStepForm` component into your app:

```tsx
import { MultiStepForm } from 'react-native-multistep';
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `stepsContent` (required) | `React.ReactNode[]` | - | An array of React nodes, where each node represents the content for each step. |
| `onStepChange` (optional) | `(currentStep: number) => void` | - | A callback that is triggered whenever the step changes. |
| `onStepForward` (optional) | `(currentStep: number) => void` | - | A callback that is triggered when moving to the next step. |
| `onStepBackward` (optional) | `(currentStep: number) => void` | - | A callback that is triggered when moving to the previous step. |
| `backButtonLabel` (optional) | `string` | `Back` | Label for the back button. |
| `nextButtonLabel` (optional) | `string` | `Next` | Label for the next button. |
| `doneButtonLabel` (optional) | `string` | `Done` | Label for the done button (appears on the last step). |
| `onComplete` (optional) | `() => void` | - | A callback triggered when the form is completed (on the last step). |
| `style` (optional) | `StyleProp<ViewStyle>` | - | Custom style for the root container. |
| `nextButtonStyle` (optional) | `StyleProp<ViewStyle>` | - | Custom style for the next button. |
| `previousButtonStyle` (optional) | `StyleProp<ViewStyle>` | - | Custom style for the previous (back) button. |
| `doneButtonStyle` (optional) | `StyleProp<ViewStyle>` | - | Custom style for the done button. |
| `stepsContainerStyle` (optional) | `StyleProp<ViewStyle>` | - | Custom style for the container holding step indicators. |
| `activeStepStyle` (optional) | `StyleProp<ViewStyle>` | - | Custom style for active step indicators. |
| `inactiveStepStyle` (optional) | `StyleProp<ViewStyle>` | - | Custom style for inactive step indicators. |
| `contentContainerStyle` (optional) | `StyleProp<ViewStyle>` | - | Custom style for the content container. |
| `buttonsContainerStyle` (optional) | `StyleProp<ViewStyle>` | - | Custom style for the buttons container at the bottom. |

## Usage Example

```tsx
import React from 'react';
import { MultiStepForm } from 'react-native-multistep';

const App = () => {
  const stepsContent = [
    <Text>Step 1: Personal Information</Text>,
    <Text>Step 2: Address</Text>,
    <Text>Step 3: Review</Text>,
  ];

  const handleStepChange = (currentStep: number) => {
    console.log(`Current Step: ${currentStep}`);
  };

  const handleComplete = () => {
    console.log('Form Completed!');
  };

  return (
    <MultiStepForm
      stepsContent={stepsContent}
      onStepChange={handleStepChange}
      onComplete={handleComplete}
      backButtonLabel="Go Back"
      nextButtonLabel="Next Step"
      doneButtonLabel="Finish"
      style={{ padding: 20 }}
      nextButtonStyle={{ backgroundColor: 'blue' }}
      previousButtonStyle={{ backgroundColor: 'gray' }}
      doneButtonStyle={{ backgroundColor: 'green' }}
      activeStepStyle={{ backgroundColor: 'blue' }}
      inactiveStepStyle={{ backgroundColor: 'lightgray' }}
    />
  );
};

export default App;
```

## Styling

The component uses `StyleSheet.create` for default styles. You can customize any part of the form by passing the relevant `style` props. Here are the available options:

- **Root Container**: `style`
- **Step Indicator Container**: `stepsContainerStyle`
- **Active/Inactive Step Indicator**: `activeStepStyle`, `inactiveStepStyle`
- **Content Area**: `contentContainerStyle`
- **Footer Buttons Container**: `buttonsContainerStyle`
- **Back Button**: `previousButtonStyle`
- **Next Button**: `nextButtonStyle`
- **Done Button**: `doneButtonStyle`

## Animations

- **Step Indicator Animation**: Each step indicator has a scale animation applied when it becomes active. The active step indicator will briefly enlarge when selected, providing a visual cue for the user.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with love by [Aziz Becha](https://azizbecha.com)
