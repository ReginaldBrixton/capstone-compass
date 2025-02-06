'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ChatWindow from '../components/ChatWindow';
import { useRouter } from 'next/navigation';
const ChatPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ? parseInt(params.id, 10) : null;
  if (!id) {
    return (
      <div
        className="flex items-center justify-center h-full bg-gray-50"
        id="chat-error"
        data-oid=".6owliq"
      >
        <div className="text-center p-4" data-oid="lshwfuk">
          <p className="text-xl text-gray-600 mb-4" data-oid="_aey3cl">
            Chat not found
          </p>
          <button
            onClick={() => router.push('/student/messages')}
            className="text-blue-500 hover:text-blue-600"
            data-oid="81n10-q"
          >
            Return to Messages
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full w-full flex flex-col" id={`chat-${id}`} data-oid="ekok764">
      <ChatWindow chatId={id} data-oid="ps3nt5q" />
    </div>
  );
};
export default ChatPage;
