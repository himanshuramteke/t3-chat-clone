import { getCurrentUser } from "@/modules/auth/actions";
import ChatMessageView from "@/modules/chat/components/chat-message-view";

export default async function Home() {
  await getCurrentUser();

  return <ChatMessageView />;
}
