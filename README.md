# Payslips App

A React Native application for managing and viewing payslips. Built with TypeScript, featuring native file handling, clean architecture, and a polished mobile UX.

## Features

- **Payslip List** - Scrollable list of payslips with sorting and search
- **Payslip Details** - View payslip information
- **Download** - Save payslips to device storage
- **Preview** - Open payslips with system PDF viewer
- **Search** - Filter payslips by date range or ID
- **Sorting** - Sort by most recent or oldest first

## Tech Stack

### Core
- **React Native CLI** (0.83.1) - Native mobile development
- **TypeScript** (5.8.3) - Type safety and better developer experience
- **React** (19.2.0) - UI framework

### Navigation
- **@react-navigation/native** (^7.1.26) - Navigation library
- **@react-navigation/native-stack** (^7.9.0) - Stack navigator
- **react-native-screens** (^4.19.0) - Native screen components

### File Handling
- **react-native-fs** (^2.20.0) - File system operations
- **react-native-file-viewer** (^2.1.5) - PDF preview functionality

### State Management
- **React Context API** - Lightweight state management for mock data

### Testing
- **Jest** (^29.6.3) - Testing framework
- **react-test-renderer** (^19.2.0) - Component testing

## Architecture

The app follows a clean architecture pattern:

```
src/
├── types/          # TypeScript type definitions
├── data/           # Mock data
├── context/        # State management (React Context)
├── screens/        # Screen components
├── components/     # Reusable UI components
├── navigation/     # Navigation setup
├── utils/          # Utility functions (date formatting, file handling)
└── theme/          # Design tokens (colors, spacing)
```

## Prerequisites

- **Node.js** >= 20
- **React Native development environment** set up
  - For iOS: Xcode and CocoaPods
  - For Android: Android Studio and Android SDK
- See [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) for details

## Getting Started

### 1. Install Dependencies

```sh
npm install
```

### 2. iOS Setup

Install CocoaPods dependencies:

```sh
cd ios
bundle exec pod install
cd ..
```

### 3. Start Metro Bundler

```sh
npm start
```

### 4. Run the App

#### Android

```sh
npm run android
```

**Note:** Ensure you have:
- Android emulator running, OR
- Physical device connected with USB debugging enabled

#### iOS

```sh
npm run ios
```

**Note:** Ensure you have:
- iOS Simulator available, OR
- Physical device connected (requires Apple Developer account)

## Project Setup Details

### Native Assets

The app requires a sample PDF file in native assets:

**Android:**
- Place `sample.pdf` in: `android/app/src/main/assets/payslips/sample.pdf`

**iOS:**
- Add `sample.pdf` to Xcode project
- Ensure it's included in "Copy Bundle Resources" in Build Phases

### Running Tests

```sh
npm test
```

## Known Limitations

1. **PDF Viewer Dependency** - On Android, preview requires a PDF viewer app to be installed. The app will show a helpful error message if no viewer is found.

2. **File Storage Location** - Files are saved to app-private storage (`DocumentDirectoryPath`), not user-accessible locations like Downloads folder. This was chosen to avoid complex permission handling.

3. **Mock Data Only** - The app uses in-memory mock data. No API integration or persistent storage beyond downloaded files.

4. **Single PDF File** - All payslips reference the same bundled PDF file. In a production app, each payslip would have its own file.

5. **Filter UI** - Search functionality is implemented, but year filter UI is not included (filtering logic exists in context).

## What I Would Improve With More Time

1. **Enhanced File Management**
   - Save to user-accessible Downloads folder (with proper Android permissions)
   - File sharing capabilities
   - File management screen to view downloaded payslips

2. **Better Error Handling**
   - Retry mechanisms for failed downloads
   - Offline state handling
   - More detailed error messages

3. **UI/UX Enhancements**
   - Pull-to-refresh functionality
   - Loading skeletons instead of blank screens
   - Animations and transitions
   - Dark mode support
   - Year filter UI component

4. **Testing**
   - More comprehensive component tests
   - Integration tests for file operations
   - E2E tests for critical user flows

5. **Performance**
   - Image caching if image support is added
   - Optimized re-renders with React.memo

6. **Accessibility**
   - Screen reader testing and improvements
   - Keyboard navigation enhancements
   - High contrast mode support

7. **Production Features**
   - API integration for real payslip data
   - Authentication and user management
   - Secure file storage
   - Push notifications for new payslips

## Library Choices & Trade-offs

### React Native CLI vs Expo
**Choice:** React Native CLI  
**Reason:** More control over native code and less boilerplate code compared to expo.

### Context API vs Redux
**Choice:** React Context API  
**Reason:** Sufficient for mock data and simple state. Redux would be overkill for this scope. Easy to migrate to Redux if needed.

### react-native-fs
**Choice:** react-native-fs  
**Reason:** Well-maintained, comprehensive file system API, good documentation, and works reliably on both platforms.

### react-native-file-viewer
**Choice:** react-native-file-viewer  
**Reason:** Simple API, handles PDF viewing on both platforms, good error handling.

## Troubleshooting

### Android: "No app associated with this mime type"
Install a PDF viewer app from the Play Store (e.g., Adobe Acrobat Reader, Google PDF Viewer).

### iOS: Build fails after adding dependencies
Run `cd ios && pod install && cd ..` to update CocoaPods dependencies.

### Tests fail with module errors
Ensure `jest.setup.js` exists and mocks are properly configured. Run `npm test` to verify.
