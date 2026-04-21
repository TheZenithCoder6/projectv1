// PATH: src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const DJANGO_BASE_URL = "https://nanopixel.vercel.app";

async function verifyDjangoAdmin(username: string, password: string): Promise<boolean> {
  try {
    // Step 1: Login page fetch karo
    const csrfRes = await fetch(`${DJANGO_BASE_URL}/admin/login/`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    const csrfText = await csrfRes.text();
    
    // Multiple regex patterns try karo
    let csrfToken = "";
    const patterns = [
      /name="csrfmiddlewaretoken"\s+value="([^"]+)"/,
      /value="([^"]+)"\s+name="csrfmiddlewaretoken"/,
      /csrfmiddlewaretoken['"]\s+value=['"]([\w]+)['"]/,
      /"csrfmiddlewaretoken",\s*"([^"]+)"/,
    ];
    
    for (const pattern of patterns) {
      const match = csrfText.match(pattern);
      if (match?.[1]) {
        csrfToken = match[1];
        break;
      }
    }

    // Cookie se bhi try karo
    const allCookies = csrfRes.headers.getSetCookie?.() ?? 
                       [csrfRes.headers.get("set-cookie") ?? ""];
    
    let csrfCookie = "";
    for (const cookie of allCookies) {
      const match = cookie.match(/csrftoken=([^;]+)/);
      if (match?.[1]) {
        csrfCookie = match[1];
        break;
      }
    }

    // Agar HTML mein token nahi mila, cookie se use karo
    if (!csrfToken && csrfCookie) {
      csrfToken = csrfCookie;
    }

    console.log("[nextauth] CSRF token:", csrfToken ? "✓ mila" : "✗ nahi mila");
    console.log("[nextauth] CSRF cookie:", csrfCookie ? "✓ mila" : "✗ nahi mila");
    console.log("[nextauth] Response status:", csrfRes.status);
    console.log("[nextauth] HTML snippet:", csrfText.substring(0, 500));

    if (!csrfToken) {
      console.error("[nextauth] CSRF token nahi mila — HTML dump:", csrfText.substring(0, 1000));
      return false;
    }

    // Step 2: Login POST
    const loginRes = await fetch(`${DJANGO_BASE_URL}/admin/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `csrftoken=${csrfCookie}`,
        "Referer": `${DJANGO_BASE_URL}/admin/login/`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Origin": DJANGO_BASE_URL,
      },
      body: new URLSearchParams({
        username,
        password,
        csrfmiddlewaretoken: csrfToken,
        next: "/admin/",
      }).toString(),
      redirect: "manual",
    });

    const location = loginRes.headers.get("location") ?? "";
    const success = loginRes.status === 302 && !location.includes("login");

    console.log("[nextauth] Login status:", loginRes.status);
    console.log("[nextauth] Location:", location);
    console.log("[nextauth] Success:", success);

    return success;

  } catch (err: any) {
    console.error("[nextauth] Error:", err.message);
    return false;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const isAdmin = await verifyDjangoAdmin(credentials.email, credentials.password);

        if (isAdmin) {
          return { id: "django-admin", name: "Admin", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };