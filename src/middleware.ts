import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = { matcher: ["/dashboard(.*)"] }

const protectedRoutes = ["/profile"]

export default async function middleware(request: NextRequest){
    // const session = await auth();
    const {pathname} = request.nextUrl;

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

    // if (isProtected && !session){
    //     const url = new URL("/", request.url);
    //     return NextResponse.redirect(url);
    // }

    return NextResponse.next();
}