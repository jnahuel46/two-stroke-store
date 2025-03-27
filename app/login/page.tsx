"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="text-center text-3xl font-extrabold">
            Iniciar sesión
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="font-extrabold rounded-md shadow-sm space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700"
              >
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div>
            <Button className="w-full" type="submit" variant="outline">
              Iniciar sesión
            </Button>
          </div>

          <div className="text-sm text-center">
            ¿No tienes una cuenta?{" "}
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-500">
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
