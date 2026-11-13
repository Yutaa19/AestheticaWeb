import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const TOTAL_SLOTS = 100;
const INITIAL_REMAINING = 98;
const STORE_PATH = path.join("/tmp", "aestheticaweb-slots.json");

interface SlotStore {
  remaining: number;
}

async function readSlots(): Promise<number> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as SlotStore;
    if (typeof parsed.remaining === "number") {
      return Math.max(0, Math.min(TOTAL_SLOTS, parsed.remaining));
    }
  } catch {
    // Initialize store on first read
  }
  await writeSlots(INITIAL_REMAINING);
  return INITIAL_REMAINING;
}

async function writeSlots(remaining: number): Promise<void> {
  await fs.writeFile(STORE_PATH, JSON.stringify({ remaining }), "utf-8");
}

export async function GET() {
  const remaining = await readSlots();
  return NextResponse.json({ total: TOTAL_SLOTS, remaining });
}

export async function POST() {
  const current = await readSlots();
  const nextRemaining = Math.max(0, current - 1);
  await writeSlots(nextRemaining);
  return NextResponse.json({ total: TOTAL_SLOTS, remaining: nextRemaining });
}
