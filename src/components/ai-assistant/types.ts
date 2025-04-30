
export interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
  attachments?: string[]; // For future expansion to support file attachments
  isImportant?: boolean; // For future expansion to mark important messages
}
