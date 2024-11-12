"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define the shape of our authentication state
interface AuthState {
  userToken: string;
  adminToken: string;
  resetUserEmail: string;
  otpMail: string;
}

// Define the shape of the context's methods, along with the AuthState properties
interface AuthContextProps extends AuthState {
  setCredentials: (tokenType: keyof AuthState, token: string) => void;
  logout: (tokenType: keyof AuthState) => void;
  setMultipleCredentials: (newState: Partial<AuthState>) => void;
}

// Helper function to fetch and parse the persisted auth state from localStorage
const getPersistedAuthState = (): AuthState => {
  if (typeof window !== "undefined") {
    const storedAuthState = localStorage.getItem("auth");
    if (storedAuthState) {
      try {
        return JSON.parse(storedAuthState);
      } catch (error) {
        console.error("Failed to parse auth state from localStorage", error);
      }
    }
  }
  return {
    userToken: "",
    adminToken: "",
    otpMail: "",
    resetUserEmail: "",
  };
};

// Initialize the auth state
const initialState: AuthState = getPersistedAuthState();

// Create the AuthContext with undefined as the initial default value
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Define the state and its updater function
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Sync the state with localStorage on mount
  useEffect(() => {
    const storedAuthState = getPersistedAuthState();
    setAuthState((prevState) => ({
      ...prevState,
      ...storedAuthState
    }));
  }, []);

  // Function to set a specific token in the auth state and localStorage
  const setCredentials = (tokenType: keyof AuthState, token: string) => {
    setAuthState((prevState) => {
      const newAuthState = { ...prevState, [tokenType]: token };
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(newAuthState));
      }
      return newAuthState;
    });
  };

  // Function to remove a specific token by setting it to an empty string
  const logout = (tokenType: keyof AuthState) => {
    setAuthState((prevState) => {
      const newAuthState = { ...prevState, [tokenType]: "" };
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(newAuthState));
      }
      return newAuthState;
    });
  };

  // Function to set multiple tokens at once
  const setMultipleCredentials = (newState: Partial<AuthState>) => {
    setAuthState((prevState) => {
      const updatedState = { ...prevState, ...newState };
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(updatedState));
      }
      return updatedState;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setCredentials,
        logout,
        setMultipleCredentials
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
