import { NextResponse } from 'next/server';
import { verifyToken } from '../session/utils';
import { storage } from '../session/storage';

// Initialize messages storage if not exists
if (!storage.messages) {
  storage.messages = new Map();
}

// Helper to get conversation ID between two users
function getConversationId(user1Id, user2Id) {
  return [user1Id, user2Id].sort().join('_');
}

// Helper to validate message content
function validateMessage(content) {
  return content && typeof content === 'string' && content.length <= 1000;
}

// Authentication middleware
async function authenticateRequest(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return verifyToken(token);
}

export async function POST(request) {
  try {
    const userId = await authenticateRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { recipientId, content } = await request.json();

    if (!recipientId || !validateMessage(content)) {
      return NextResponse.json({ error: 'Invalid message content or recipient' }, { status: 400 });
    }

    // Check if recipient exists
    const recipientExists = [...storage.users.values()].some(user => user.id === recipientId);
    if (!recipientExists) {
      return NextResponse.json({ error: 'Recipient not found' }, { status: 404 });
    }

    const conversationId = getConversationId(userId, recipientId);
    const message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`,
      senderId: userId,
      recipientId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };

    const conversation = storage.messages.get(conversationId) || [];
    conversation.push(message);
    storage.messages.set(conversationId, conversation);

    return NextResponse.json({ message: 'Message sent successfully', messageId: message.id });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const userId = await authenticateRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const withUserId = url.searchParams.get('withUser');

    let conversations = [];
    if (withUserId) {
      // Get specific conversation
      const conversationId = getConversationId(userId, withUserId);
      const conversation = storage.messages.get(conversationId) || [];
      conversations = conversation;
    } else {
      // Get all conversations
      for (const [convId, messages] of storage.messages.entries()) {
        if (convId.includes(userId)) {
          conversations = conversations.concat(messages);
        }
      }
    }

    // Sort by timestamp
    conversations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return NextResponse.json({ conversations });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const userId = await authenticateRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messageId } = await request.json();
    if (!messageId) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    let messageFound = false;
    for (const [convId, messages] of storage.messages.entries()) {
      if (convId.includes(userId)) {
        const message = messages.find(m => m.id === messageId && m.recipientId === userId);
        if (message) {
          message.read = true;
          messageFound = true;
          storage.messages.set(convId, messages);
          break;
        }
      }
    }

    if (!messageFound) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Message marked as read' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}