import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        console.log("Login attempt:", { email, ADMIN_EMAIL });

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = signToken({ role: "admin" });
            console.log("Login successful, setting cookie");

            const response = NextResponse.json({ success: true });

            response.cookies.set("admin_token", token, {
                httpOnly: true,
                secure: false, // localhost
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
        
            });

            return response;
        }

        console.log("Login failed - invalid credentials");
        return NextResponse.json(
            { success: false, message: "Invalid credentials" },
            { status: 401 }
        );
    } catch (err) {
        console.log("Login error:", err);
    }
}
