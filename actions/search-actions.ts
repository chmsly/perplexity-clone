"use server"

import { revalidatePath } from "next/cache"
import { ActionState } from "@/types"
import { createChat, getChatById } from "@/db/queries/chats-queries"
import { createMessage } from "@/db/queries/messages-queries"
import { createSource } from "@/db/queries/sources-queries"
import { SelectMessage, SelectSource } from "@/db/schema"
import { nanoid } from "nanoid"

interface SearchActionParams {
  userId: string
  chatId?: string
  query: string
}

interface SearchResult {
  messages: SelectMessage[]
  sources: SelectSource[]
}

export async function searchAction({
  userId,
  chatId,
  query
}: SearchActionParams): Promise<ActionState<SearchResult>> {
  console.log("Search action called with:", { userId, chatId, query });
  
  try {
    let chat;
    let messages: SelectMessage[] = [];
    let sources: SelectSource[] = [];
    
    // If chatId is provided, get existing chat
    if (chatId) {
      console.log("Getting existing chat:", chatId);
      chat = await getChatById(chatId);
      if (!chat || chat.userId !== userId) {
        console.error("Chat not found or unauthorized:", chatId);
        return {
          isSuccess: false,
          message: "Chat not found or unauthorized"
        };
      }
    } else {
      // Create a new chat
      console.log("Creating new chat for user:", userId);
      const chatId = nanoid();
      chat = await createChat({
        id: chatId,
        userId,
        name: query.length > 30 ? `${query.substring(0, 30)}...` : query
      });
      console.log("New chat created:", chat?.id);
    }
    
    if (!chat) {
      console.error("Failed to create or retrieve chat");
      return {
        isSuccess: false,
        message: "Failed to create or retrieve chat"
      };
    }
    
    // Add user message
    console.log("Creating user message");
    const userMessage = await createMessage({
      id: nanoid(),
      chatId: chat.id,
      content: query,
      role: "user"
    });
    
    if (userMessage) {
      messages.push(userMessage);
      console.log("User message created:", userMessage.id);
    }
    
    // Simulate AI response (replace with actual AI call)
    console.log("Creating AI response");
    const aiResponse = "This is a simulated AI response to your query: " + query;
    const aiMessageId = nanoid();
    const aiMessage = await createMessage({
      id: aiMessageId,
      chatId: chat.id,
      content: aiResponse,
      role: "assistant"
    });
    
    if (aiMessage) {
      messages.push(aiMessage);
      console.log("AI message created:", aiMessage.id);
    }
    
    // Simulate source (replace with actual source retrieval)
    console.log("Creating source");
    const source = await createSource({
      id: nanoid(),
      messageId: aiMessageId,
      chatId: chat.id,
      title: "Example Source",
      url: "https://example.com",
      content: "This is example source content related to your query."
    });
    
    if (source) {
      sources.push(source);
      console.log("Source created:", source.id);
    }
    
    console.log("Search completed successfully");
    revalidatePath(`/search/${chat.id}`);
    
    return {
      isSuccess: true,
      message: "Search completed successfully",
      data: {
        messages,
        sources
      }
    };
  } catch (error) {
    console.error("Error in search action:", error);
    return {
      isSuccess: false,
      message: "An error occurred during search"
    };
  }
} 