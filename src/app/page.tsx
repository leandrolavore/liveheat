import View from "@/components/view";

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col flex-1 gap-[32px] items-center sm:items-start w-full">
        <View />
      </main>
    </div>
  );
}
