/* eslint-env jest */
// Mock react-native-fs
jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/mock/documents',
  MainBundlePath: '/mock/bundle',
  readFileAssets: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
  exists: jest.fn(),
}));

// Mock react-native-file-viewer
jest.mock('react-native-file-viewer', () => ({
  default: {
    open: jest.fn(),
  },
}));

