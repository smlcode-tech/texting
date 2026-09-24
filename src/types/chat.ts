export type Profile = {
  id: string
  display_name: string
  avatar_url: string | null
  created_at: string
}

export type Conversation = {
  id: string
  is_group: boolean
  title: string | null
  created_by: string
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  conversation_id: string
  sender_id: string
  body: string
  created_at: string
  edited_at: string | null
}

export type ConversationSummary = Conversation & {
  participants: Profile[]
  last_message: Message | null
}
