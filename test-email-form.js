// Test script for email form functionality
const testEmailForm = async () => {
  console.log('🧪 Testing Email Form Integration');
  console.log('====================================');

  const testData = {
    firstName: 'Тест',
    lastName: 'Користувач',
    email: 'test@example.com',
    phoneNumber: '+380123456789',
    message:
      'Це тестове повідомлення для перевірки роботи форми відправки електронної пошти. Форма має працювати з бекендом згідно з EMAIL_SYSTEM_GUIDE.',
    selectedValue: 'Product Inquiry - Test Product',
  };

  try {
    console.log('📤 Sending test email...');
    console.log('Data:', JSON.stringify(testData, null, 2));

    const response = await fetch('http://localhost:3002/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('📨 Response status:', response.status);
    console.log(
      '📨 Response headers:',
      Object.fromEntries(response.headers.entries())
    );

    const result = await response.json();
    console.log('📨 Response data:', JSON.stringify(result, null, 2));

    if (response.ok && result.success) {
      console.log('✅ Test PASSED: Email sent successfully');
      console.log('✅ Message:', result.message);
    } else {
      console.log('❌ Test FAILED: Email not sent');
      console.log('❌ Error:', result.message || result.error);
    }
  } catch (error) {
    console.log('💥 Test ERROR:', error.message);
  }

  console.log('====================================');
};

// Run the test
testEmailForm();
