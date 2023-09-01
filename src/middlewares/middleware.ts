import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware (req: NextRequest) {
    console.log("SE HA EJECUTADO MIDDLEWARE");

    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});
    // Refresca la sesión si esta ha expirado
    await supabase.auth.getSession();
    return res;
}