import { createContext } from "react";
import { ProviderOutput } from "../models/usert";

export const AuthContext = createContext<ProviderOutput>({} as any);