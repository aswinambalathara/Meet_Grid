
interface ValidationErrors {
    fullName?: string | null;
    email?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
  }

  
  export const validateFullName = (fullName: string): string | null=> {
    if (!fullName.trim()) return "Full Name is required";
    if (fullName.length < 3) return "Full Name must be at least 3 characters";
    return null;
  };
  
  export const validateEmail = (email: string): string | null  => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return null;
  };
  
  export const validatePassword = (password: string): string | null => {
    // Minimum length of 6 characters
    const minLengthRegex = /^.{6,}$/;
    if (!minLengthRegex.test(password)) {
      return "Password must be at least 6 characters long.";
    }
  
    // At least one uppercase letter
    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
  
    // At least one number
    const numberRegex = /\d/;
    if (!numberRegex.test(password)) {
      return "Password must contain at least one number.";
    }
  
    // At least one special character
    const specialCharRegex = /[@$!%*?&]/;
    if (!specialCharRegex.test(password)) {
      return "Password must contain at least one special character (e.g., @$!%*?&).";
    }
  
    // If all checks pass, return an empty string (no error)
    return null;
  };
  
  
  export const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ): string | null => {
    if (confirmPassword !== password) return "Passwords do not match";
    return null;
  };
  


  export const validateSignUpForm = (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
  ): ValidationErrors => {
    return {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword, password),
    };
  };
  