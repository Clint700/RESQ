exports.smsStatusHandler = (req, res) => {
    const {
      MessageSid,
      To,
      From,
      MessageStatus,
      ErrorCode,
      ErrorMessage
    } = req.body;
  
    console.log('📬 Twilio SMS Status Update:', {
      sid: MessageSid,
      to: To,
      from: From,
      status: MessageStatus,
      errorCode: ErrorCode,
      errorMessage: ErrorMessage
    });
  
    // 📝 Optional: Save this data to sms_logs table
  
    res.status(200).send('Webhook received');
  };