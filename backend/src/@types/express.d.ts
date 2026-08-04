import { Profile } from '@prisma/client';

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  profile: Profile;
  localId?: string | null;
  allowedLocals?: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
