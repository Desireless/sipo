import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware (req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});
    // Refresca la sesión si esta ha expirado
    await supabase.auth.getSession();
    return res;
}