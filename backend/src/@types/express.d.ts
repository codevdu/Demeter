import { Profile } from '@prisma/client';

export interface TokenPayload {
  id: string;
  profile: Profile;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
