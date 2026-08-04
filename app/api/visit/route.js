import { createHmac } from "crypto";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// A Redis SET of hashed visitor identifiers. SADD only adds a member
// if it isn't already present, and returns how many members were
// actually added — that's the "is this actually a new visitor" check,
// done server-side instead of trusting the visitor's own browser.
const SET_KEY = "portfolio:unique-visitors";

function getClient() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// Never store the raw IP. HMAC it with a server-only secret so the
// stored value can't be reversed back into an address.
function hashIp(ip) {
  const secret = process.env.VISIT_HASH_SECRET || "dev-only-fallback-secret";
  return createHmac("sha256", secret).update(ip).digest("hex");
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request) {
  const redis = getClient();
  if (!redis) {
    return NextResponse.json(
      { error: "Visit counter isn't configured yet." },
      { status: 503 }
    );
  }

  try {
    const ip = getClientIp(request);
    const hashed = hashIp(ip);

    // 1 if this hash was newly added (first time we've seen this IP),
    // 0 if it was already a member (repeat visitor).
    await redis.sadd(SET_KEY, hashed);
    const count = await redis.scard(SET_KEY);

    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record visit." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const redis = getClient();
  if (!redis) {
    return NextResponse.json(
      { error: "Visit counter isn't configured yet." },
      { status: 503 }
    );
  }

  try {
    const count = await redis.scard(SET_KEY);
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read visit count." },
      { status: 500 }
    );
  }
}