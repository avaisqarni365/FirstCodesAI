"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, Check, CheckCheck } from "lucide-react";

const mockChats = [
  {
    id: "1", name: "Sarah Chen", phone: "+447700900001", lastMessage: "Thank you for the proposal!", lastTime: "10:30 AM", unread: 2, online: true,
    messages: [
      { id: "m1", body: "Hi Avais, just wanted to follow up on the Azure migration project.", direction: "INBOUND", time: "10:15 AM", status: "read" },
      { id: "m2", body: "Hi Sarah! Yes, the proposal is ready. I'll send it over today.", direction: "OUTBOUND", time: "10:20 AM", status: "read" },
      { id: "m3", body: "That would be great. We're eager to get started.", direction: "INBOUND", time: "10:25 AM", status: "read" },
      { id: "m4", body: "Just sent it to your email. Let me know if you have any questions.", direction: "OUTBOUND", time: "10:28 AM", status: "delivered" },
      { id: "m5", body: "Thank you for the proposal!", direction: "INBOUND", time: "10:30 AM", status: "read" },
    ],
  },
  {
    id: "2", name: "Mohammed Ali", phone: "+447700900004", lastMessage: "Budget approved! Let's go.", lastTime: "9:45 AM", unread: 1, online: true,
    messages: [
      { id: "m1", body: "Hi Avais, any update on the IoT dashboard quote?", direction: "INBOUND", time: "9:30 AM", status: "read" },
      { id: "m2", body: "Hi Mohammed, working on it. Should have it by end of day.", direction: "OUTBOUND", time: "9:35 AM", status: "read" },
      { id: "m3", body: "Budget approved! Let's go.", direction: "INBOUND", time: "9:45 AM", status: "read" },
    ],
  },
  {
    id: "3", name: "Rebecca Hughes", phone: "+447700900005", lastMessage: "Payment sent. Check your account.", lastTime: "Yesterday", unread: 0, online: false,
    messages: [
      { id: "m1", body: "Hi Rebecca, just a reminder about the outstanding invoice.", direction: "OUTBOUND", time: "2:00 PM", status: "read" },
      { id: "m2", body: "Oh yes, I'll process it today.", direction: "INBOUND", time: "3:15 PM", status: "read" },
      { id: "m3", body: "Payment sent. Check your account.", direction: "INBOUND", time: "4:30 PM", status: "read" },
    ],
  },
  {
    id: "4", name: "Jehanzaib Hassan", phone: "+447700900010", lastMessage: "Team meeting at 3pm today", lastTime: "Yesterday", unread: 0, online: true,
    messages: [
      { id: "m1", body: "Team meeting at 3pm today", direction: "INBOUND", time: "11:00 AM", status: "read" },
      { id: "m2", body: "Noted. I'll prepare the sprint review slides.", direction: "OUTBOUND", time: "11:05 AM", status: "read" },
      { id: "m3", body: "Perfect. Also let's discuss the new client pipeline.", direction: "INBOUND", time: "11:10 AM", status: "read" },
      { id: "m4", body: "Will do. I have some good leads from Companies House.", direction: "OUTBOUND", time: "11:12 AM", status: "read" },
    ],
  },
  {
    id: "5", name: "Tom Roberts", phone: "+447700900008", lastMessage: "Looking forward to the kickoff!", lastTime: "Mar 22", unread: 0, online: false,
    messages: [
      { id: "m1", body: "Hi Tom, contract is signed and returned. We're ready to start.", direction: "OUTBOUND", time: "10:00 AM", status: "read" },
      { id: "m2", body: "Excellent! When can we do the kickoff meeting?", direction: "INBOUND", time: "10:30 AM", status: "read" },
      { id: "m3", body: "How about next Tuesday at 10am?", direction: "OUTBOUND", time: "10:35 AM", status: "read" },
      { id: "m4", body: "Looking forward to the kickoff!", direction: "INBOUND", time: "10:40 AM", status: "read" },
    ],
  },
  {
    id: "6", name: "Priya Sharma", phone: "+447700900007", lastMessage: "Can you share your AI portfolio?", lastTime: "Mar 21", unread: 0, online: false,
    messages: [
      { id: "m1", body: "Hi Avais, we're interested in AI development services.", direction: "INBOUND", time: "2:00 PM", status: "read" },
      { id: "m2", body: "Hi Priya! Happy to discuss. What kind of AI solutions are you looking for?", direction: "OUTBOUND", time: "2:15 PM", status: "read" },
      { id: "m3", body: "Can you share your AI portfolio?", direction: "INBOUND", time: "2:30 PM", status: "read" },
    ],
  },
];

export default function WhatsAppPage() {
  const [selectedChatId, setSelectedChatId] = useState<string>("1");
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedChat = mockChats.find((c) => c.id === selectedChatId);
  const filteredChats = mockChats.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-emerald-600" /> WhatsApp
        </h1>
        <Badge variant="outline" className="border-peach-300 text-peach-600 text-xs">WhatsApp Business API Required</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-xl overflow-hidden border border-warm-200/60 h-[calc(100vh-220px)]">
        {/* Chat List */}
        <div className="bg-white border-r border-warm-200/60 flex flex-col">
          <div className="p-3 border-b border-warm-200/60">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search chats..." className="pl-10 bg-warm-50 border-warm-200 text-warm-800 text-sm h-9" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div key={chat.id} onClick={() => setSelectedChatId(chat.id)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${selectedChatId === chat.id ? "bg-peach-50/50" : "hover:bg-warm-50"}`}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-peach-500 to-peach-400 flex items-center justify-center text-white text-sm font-semibold">
                    {chat.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-warm-800 truncate">{chat.name}</p>
                    <span className="text-[10px] text-warm-400">{chat.lastTime}</span>
                  </div>
                  <p className="text-xs text-warm-500 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-peach-500 text-white text-[10px] flex items-center justify-center font-bold">{chat.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="lg:col-span-2 bg-[#FEF9F4] flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-3 border-b border-warm-200/60 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-peach-500 to-peach-400 flex items-center justify-center text-white text-xs font-semibold">
                    {selectedChat.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-warm-800">{selectedChat.name}</p>
                    <p className="text-[10px] text-warm-500">{selectedChat.online ? "Online" : "Last seen recently"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="text-warm-500 hover:text-warm-800"><Phone className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-warm-500 hover:text-warm-800"><Video className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-warm-500 hover:text-warm-800"><MoreVertical className="w-4 h-4" /></Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {selectedChat.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.direction === "OUTBOUND" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] px-3 py-2 rounded-lg ${msg.direction === "OUTBOUND" ? "bg-peach-100 text-warm-800" : "bg-white text-warm-700 border border-warm-200/60"}`}>
                      <p className="text-sm">{msg.body}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[10px] text-warm-400">{msg.time}</span>
                        {msg.direction === "OUTBOUND" && (
                          msg.status === "read" ? <CheckCheck className="w-3 h-3 text-blue-500" /> : <Check className="w-3 h-3 text-warm-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-warm-200/60 bg-white">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-warm-500 shrink-0"><Smile className="w-5 h-5" /></Button>
                  <Button variant="ghost" size="icon" className="text-warm-500 shrink-0"><Paperclip className="w-5 h-5" /></Button>
                  <Input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Type a message..." className="bg-warm-50 border-warm-200 text-warm-800" />
                  <Button size="icon" className="bg-gradient-to-r from-peach-500 to-peach-400 hover:from-peach-600 hover:to-peach-500 text-white shrink-0"><Send className="w-4 h-4" /></Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-warm-500">
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
