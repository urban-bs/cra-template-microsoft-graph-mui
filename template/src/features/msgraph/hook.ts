import { useContext } from "react";
import { MsGraphClientContext } from "./context";

export function useMsGraphClient() {
  return useContext(MsGraphClientContext);
}