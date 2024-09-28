import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const apiKey = process.env.API_KEY;
  const assistantId1 = process.env.ASSISTANT_ID1;
  const assistantId2 = process.env.ASSISTANT_ID2;

  try {
    // Parse the incoming request body
    const { messageContent } = await request.json();

    // Create chat session
    const chatSessionResponse = await axios.post(
      'https://agentivehub.com/api/chat/session',
      {
        api_key: apiKey,
        assistant_id: assistantId1,
      }
    );

    const session_id = chatSessionResponse.data.session_id;

    // Prepare the chat response payload
    const chatRequestData = {
      api_key: apiKey,
      session_id,
      type: 'custom_code',
      assistant_id: assistantId2,
      messages: [{ role: 'user', content: messageContent || 'Say Hello!' }],
    };

    // Send a message to the chat session
    const chatResponse = await axios.post(
      'https://agentivehub.com/api/chat',
      chatRequestData
    );

    // Return the chat response data
    return NextResponse.json(chatResponse.data);
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { error: 'Something went wrong', details: error.message },
      { status: 500 }
    );
  }
}