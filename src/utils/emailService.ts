interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  selectedValue?: string;
}

interface EmailResponse {
  success: boolean;
  data?: {
    message: string;
    timestamp: string;
  };
  error?: string;
  message: string;
}

export const sendContactEmail = async (
  data: ContactFormData
): Promise<EmailResponse> => {
  try {
    // Use the Next.js API route instead of direct backend call
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};

export type { ContactFormData, EmailResponse };
