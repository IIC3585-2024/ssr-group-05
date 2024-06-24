"use server";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";

import { redirect } from "next/navigation";

async function logout() {
  "use server";
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export default async function Navbar() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 bg-white shadow-md">
      <div className="flex items-center">
        <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/series">Series</Link>
        {data.user ? (
          <>
            <p>{data.user.email}</p>
            <form>
              <button formAction={logout}>Cerrar sesión</button>
            </form>
          </>
        ) : (
          <>
            <Link href="/auth/login">Iniciar sesión</Link>
            <Link href="/auth/signup">Registrarse</Link>
          </>
        )}
      </div>
    </div>
  );
}
