import { PublicClientApplication } from "@azure/msal-browser";
import { useContext } from "react";
import { AuthContext, MsalClientContext } from "./context";

export function useAccessToken(): string|null {
  const value = useContext(AuthContext);
  if (value.phase !== 'authorized') {
    return null;
  }
  return value.accessToken;
}

export function useMsalClient(): PublicClientApplication {
  return useContext(MsalClientContext);
}
