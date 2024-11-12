export default function generateOTP(length: number = 6): number {
  const min = 10 ** (length - 1); // Minimum value with 6 digits, e.g., 100000
  const max = 10 ** length - 1;   // Maximum value with 6 digits, e.g., 999999
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  return otp;
}

