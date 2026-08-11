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

// o back não devolve mais token — ele fica só no cookie httpOnly
export interface RegisterResponse {
  perfil: Profile;
}

interface ZodIssue {
  message: string;
  path: (string | number)[];
}

interface ApiErrorResponse {
  error?: string;
  erro?: string;
  errors?: ZodIssue[];
}

function extractErrorMessage(err: unknown): string {
  const error = err as AxiosError<ApiErrorResponse>;
  const data = error.response?.data;

  if (data?.errors?.length) {
    return data.errors.map((issue) => issue.message).join(" ");
  }

  return (
    data?.error ??
    data?.erro ??
    "Não foi possível concluir o cadastro. Tente novamente."
  );
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