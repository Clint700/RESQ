module.exports = [
    {
      alert_id: 1,
      contact_id: 1,
      message_sid: 'SM1234567890abcdef',
      to_number: '+1234567890',
      status: 'delivered',
      error_code: null,
      error_message: null,
    },
    {
      alert_id: 1,
      contact_id: 2,
      message_sid: 'SMabcdef1234567890',
      to_number: '+1987654321',
      status: 'failed',
      error_code: '30007',
      error_message: 'Carrier rejected the message',
    },
  ];