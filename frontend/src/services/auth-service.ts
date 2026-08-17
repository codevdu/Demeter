import { api } from "@/lib/api";
import { AxiosError } from "axios";

export type Profile = "PRODUTOR" | "TECNICO" | "GESTOR";


export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  cpfCnpj: string;
  carReceipt?: string | null;
  state?: string | null;
  municipalityId?: number | null;
  municipality?: string | null;
  profile?: Profile;
}

export interface IcarResponse {
  id: string;
  carReceipt: string;
  municipality: string;
  municipalityId: string
  userId: string
}

export interface RegisterResponse {
  profile: Profile;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  try {
    const { data } = await api.post<RegisterResponse>(
      "/auth/register",
      payload
    );
    return data;
  } catch (err) {
    throw new Error(extractErrorMessage(err));
  }
}

// ---------- Login ----------

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  profile: Profile;
}

export async function loginUser(
  payload: LoginPayload
): Promise<LoginResponse> {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", payload);
    return data;
  } catch (err) {
    throw new Error(extractErrorMessage(err));
  }
}

// ---------- /me ----------

export interface MeResponse {
  id: string;
  name: string;
  email: string;
  profile: Profile;
  carProperties: IcarResponse[]
}

export async function getMe(): Promise<MeResponse | null> {
  try {
    const { data } = await api.get<MeResponse>("/auth/me");
    return data;
  } catch {
    return null;
  }
}

// ---------- Redirect por role ----------

export const ROLE_REDIRECT: Record<Profile, string> = {
  PRODUTOR: "/produtor",
  TECNICO: "/tecnico",
  GESTOR: "/gestor",
};

export function isValidProfile(value: unknown): value is Profile {
  return value === "PRODUTOR" || value === "TECNICO" || value === "GESTOR";
}

interface ZodIssue {
  message: string;
  path: (string | number)[];
}

interface ApiErrorResponse {
  error?: string;
  errors?: ZodIssue[];
}

function extractErrorMessage(err: unknown): string {
  const error = err as AxiosError<ApiErrorResponse>;
  const data = error.response?.data;

  if (data?.errors?.length) {
    return data.errors.map((issue) => issue.message).join(" ");
  }

  return data?.error ?? "Não foi possível concluir a operação. Tente novamente.";
}