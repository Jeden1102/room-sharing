import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      provider: string;
      email: string;
      id: string;
      profileVisible: boolean;
    };
  }
}
