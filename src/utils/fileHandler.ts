/**
 * File handling utilities
 * Handles downloading and managing payslip files
 */
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import FileViewer from 'react-native-file-viewer';

/**
 * Downloads a payslip file to device storage
 * 
 * @param payslipId - ID of the payslip to download
 * @param file - Payslip file object with platform-specific paths
 * @returns Promise that resolves with the saved file path or rejects with error
 */
export async function downloadPayslip(
  payslipId: string,
  file: { iosBundleName: string; androidAssetPath: string },
): Promise<string> {
  const fileName = `payslip-${payslipId}.pdf`;
  const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  // Saving to DocumentDirectoryPath is app-private; no runtime storage permission needed.
  // (If you later save to Downloads, then do permissions / scoped storage work.)

  try {
    if (Platform.OS === 'android') {
      // Read from APK assets (android/app/src/main/assets/...)
      const base64 = await RNFS.readFileAssets(file.androidAssetPath, 'base64');
      await RNFS.writeFile(destinationPath, base64, 'base64');
      return destinationPath;
    }

    // iOS: read from main bundle (Xcode Copy Bundle Resources)
    const bundlePath = `${RNFS.MainBundlePath}/${file.iosBundleName}`;
    const base64 = await RNFS.readFile(bundlePath, 'base64');
    await RNFS.writeFile(destinationPath, base64, 'base64');
    return destinationPath;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(`Failed to download payslip: ${msg}`);
  }
}
/**
 * Opens/previews a payslip file using native viewer
 * 
 * @param filePath - Path to the file to open
 * @returns Promise that resolves when file is opened
 */
export async function openPayslip(filePath: string): Promise<void> {
  try {
    // Check if file exists before trying to open
    const fileExists = await RNFS.exists(filePath);
    if (!fileExists) {
      throw new Error('File not found. Please download the payslip first.');
    }

    // Open file with system's default viewer
    await FileViewer.open(filePath);
  } catch (error) {
    // FileViewer throws specific errors we can handle
    if (error instanceof Error) {
      // Check for common error messages
      if (error.message.includes('No app found') || 
          error.message.includes('No app associated') ||
          error.message.includes('mime type')) {
        throw new Error('No PDF viewer app found. Please install a PDF viewer from the Play Store.');
      }
      if (error.message.includes('not found') || error.message.includes('File not found')) {
        throw new Error('File not found. Please download the payslip first.');
      }
      throw error;
    }
    throw new Error('Failed to open payslip. Please try again.');
  }
}

