import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    workshop: string | null;
  }

  interface Session {
    user: User & {
      id: string;
      workshop: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    workshop: string | null;
  }
} 