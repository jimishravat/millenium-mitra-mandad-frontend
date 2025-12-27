import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  signOut,
  getIdToken
} from 'firebase/auth';
import { auth } from '../config/firebase';

// Setup recaptcha verifier
export const setupRecaptcha = (containerId) => {
  if (window.recaptchaVerifier) {
    return window.recaptchaVerifier;
  }

  window.recaptchaVerifier = new RecaptchaVerifier(
    containerId,
    {
      size: 'invisible',
      callback: (response) => {
        console.log('Recaptcha verified');
      },
      'expired-callback': () => {
        console.log('Recaptcha expired');
      }
    },
    auth
  );
  
  return window.recaptchaVerifier;
};

// Send OTP via Firebase
export const sendOTP = async (phoneNumber) => {
  try {
    const recaptchaVerifier = setupRecaptcha('recaptcha-container');
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );
    
    // Store confirmation result globally for OTP verification
    window.confirmationResult = confirmationResult;
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error(error.message || 'Failed to send OTP');
  }
};

// Verify OTP and get ID Token
export const verifyOTPAndGetIdToken = async (otp) => {
  try {
    if (!window.confirmationResult) {
      throw new Error('No confirmation result found. Please try again.');
    }

    const userCredential = await window.confirmationResult.confirm(otp);
    const idToken = await getIdToken(userCredential.user);
    
    // Clear the confirmation result
    window.confirmationResult = null;
    
    return { 
      success: true, 
      idToken,
      user: userCredential.user
    };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw new Error(error.message || 'Invalid OTP. Please try again.');
  }
};

// Sign out
export const firebaseSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};