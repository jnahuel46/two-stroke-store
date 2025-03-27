"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    workshop: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al registrar usuario");
      }

      // Redirigir al login después del registro exitoso
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar usuario");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="text-center text-3xl font-extrabold">
            Crear cuenta
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
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700"
              >
                Nombre
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="workshop"
                className="block text-sm font-bold text-gray-700"
              >
                Nombre del Taller (opcional)
              </label>
              <Input
                id="workshop"
                name="workshop"
                type="text"
                placeholder="Nombre de tu taller"
                value={formData.workshop}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div>
            <Button className="w-full" type="submit" variant="outline">
              Registrarse
            </Button>
          </div>

          <div className="text-sm text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 