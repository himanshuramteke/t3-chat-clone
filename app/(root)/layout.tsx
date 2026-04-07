import { getAllChats } from "@/modules/chat/actions";
import ChatSidebar from "@/modules/chat/components/chat-sidebar";
import Header from "@/modules/chat/components/header";

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: chats } = await getAllChats();
  return (
    <div className="flex h-screen overflow-hidden">
      <ChatSidebar chats={chats ?? []} />
      <main className="flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
}

export default Layout;
