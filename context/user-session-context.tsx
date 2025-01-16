"use client";
import { User } from "@/lib/session";
import React, { createContext, useContext, ReactNode } from "react";

interface UserSessionContextProps {
  userSession: User | null;
}

const UserSessionContext = createContext<UserSessionContextProps | undefined>(
  undefined
);

export const useUserSession = () => {
  const context = useContext(UserSessionContext);
  if (!context) {
    throw new Error("useUserSession must be used within a UserSessionProvider");
  }
  return context;
};

export const UserSessionProvider = ({
  userSession,
  children,
}: {
  userSession: User | null;
  children: ReactNode;
}) => {
  return (
    <UserSessionContext.Provider value={{ userSession }}>
      {children}
    </UserSessionContext.Provider>
  );
};
