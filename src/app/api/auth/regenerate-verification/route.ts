import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Відправляємо запит на backend для регенерації токена
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3000';

    const response = await fetch(
      `${backendUrl}/auth/regenerate-verification-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data.message || 'Failed to regenerate token' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'New verification email has been sent',
    });
  } catch (error) {
    console.error('Regenerate verification token error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
