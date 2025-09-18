
import { NextResponse } from 'next/server';

// No-op middleware to satisfy Next.js requirements
export default function middleware(req) {
	// You can add custom JWT authentication here if needed
	return NextResponse.next();
}
