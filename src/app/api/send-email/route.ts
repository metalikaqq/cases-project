import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log the received data (for development)
    console.log('=== EMAIL API DEBUG ===');
    console.log('Email request received:', JSON.stringify(body, null, 2));
    console.log('Body keys:', Object.keys(body));
    console.log('Body values:', Object.values(body));
    console.log(
      'Request headers:',
      Object.fromEntries(request.headers.entries())
    );

    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'phoneNumber',
      'email',
      'message',
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Make request to actual backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';
    const backendResponse = await fetch(`${backendUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const backendResult = await backendResponse.json();

    if (!backendResponse.ok) {
      console.error('Backend error:', backendResult);
      return NextResponse.json(
        {
          success: false,
          message: backendResult.message || 'Backend error occurred',
          error: backendResult.error || 'Unknown backend error',
        },
        { status: backendResponse.status }
      );
    }

    console.log('Backend success:', backendResult);
    return NextResponse.json({
      success: true,
      message: backendResult.message || 'Email sent successfully',
      data: backendResult.data,
    });
  } catch (error) {
    console.error('Email API error:', error);

    // If it's a fetch error (backend not available), return mock success for development
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.log(
        'Backend not available, returning mock success for development'
      );
      return NextResponse.json({
        success: true,
        message:
          'Email sent successfully (mock response - backend not available)',
        data: {
          message: 'Email sent successfully',
          timestamp: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
