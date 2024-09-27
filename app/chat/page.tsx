'use client'

import { useState, useEffect } from 'react'
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  text: string
  sender: 'user' | 'other'
}

export default function ChatPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/");
    }
  }, [isLoaded, userId, router]);

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    }

    setMessages([...messages, newMessage])
    setInputMessage('')

    // Send webhook
    try {
      const response = await fetch('https://hook.us1.make.com/78s6qcq96l83qdgbnuetncthmoyw27q8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      if (response.ok) {
        console.log('Webhook sent successfully')
      } else {
        console.error('Failed to send webhook')
      }
    } catch (error) {
      console.error('Error sending webhook:', error)
    }
  }

  if (!isLoaded || !userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col h-[600px] w-[350px] border rounded-lg overflow-hidden bg-white shadow-lg">
        <div className="bg-green-500 p-4 flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Adam" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h2 className="text-white font-semibold">Adam</h2>
            <p className="text-green-100 text-sm">online</p>
          </div>
        </div>
        <ScrollArea className="flex-grow p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 bg-gray-100 flex">
          <Input
            type="text"
            placeholder="Type a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-grow mr-2"
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
}