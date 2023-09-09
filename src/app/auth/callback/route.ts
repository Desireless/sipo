import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server'

export const dynamic = "force-dynamic";

export async function GET (request: NextRequest){
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    console.log("SE HA EJECUTADO ROUTE.TS");

    if(code){
        const supabase = createRouteHandlerClient<Database>({cookies});
        await supabase.auth.exchangeCodeForSession(code);
    }

    // Redireccionar a la página de inicio /
    return NextResponse.redirect(requestUrl.origin);
}