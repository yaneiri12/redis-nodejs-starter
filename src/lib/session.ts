import * as jose from "jose";
import setCookie from "set-cookie-parser";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export interface Session {
  id: string;
  expires: Date;
}

if (!process.env.SESSION_SECRET) {
  console.error("SESSION_SECRET not set");
}

const sessionConfig = {
  secret: new TextEncoder().encode(process.env.SESSION_SECRET),
  ttl: 60 * 60 * 24 * 7, // 1 week
};

export async function encrypt(payload: any): Promise<string> {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setJti(payload.id ?? nanoid())
    .setExpirationTime("1w")
    .sign(sessionConfig.secret);
}

export async function decrypt(value: string): Promise<Session> {
  const { payload } = await jose.jwtVerify<Session>(
    value,
    sessionConfig.secret,
    {
      algorithms: ["HS256"],
    }
  );

  return payload;
}

export async function updateSession(request: NextRequest) {
  let token = request.cookies.get("session")?.value;

  if (!token) {
    token = await encrypt({
      id: nanoid(),
      expires: new Date(Date.now() + sessionConfig.ttl * 1000),
    });
  }

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(token);
  parsed.expires = new Date(Date.now() + sessionConfig.ttl * 1000);

  const res = NextResponse.next();

  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    path: "/",
    expires: parsed.expires,
  });

  return res;
}

export function getSessionCookie() {
  const header = headers().get("set-cookie");
  let session: string | undefined;

  if (typeof header === "string") {
    const cookie = setCookie.parse(header, {
      decodeValues: true,
    });

    session = cookie.find((value) => value.name === "session")?.value;
  }

  return session;
}
