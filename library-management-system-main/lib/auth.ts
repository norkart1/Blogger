import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "library-management-secret-key-2024")

export interface AdminUser {
  username: string
  role: "admin"
}

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "12345",
}

export async function verifyCredentials(username: string, password: string): Promise<AdminUser | null> {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    return { username, role: "admin" }
  }
  return null
}

export async function createSession(user: AdminUser): Promise<string> {
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(JWT_SECRET)

  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  })

  return token
}

export async function getSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as AdminUser
  } catch {
    return null
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}
