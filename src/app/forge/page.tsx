import ForgePageClient from "@/components/ForgePageClient";

export default function ForgePage() {
  return (
    <ForgePageClient
      initialDemoModeAvailable={true}
      initialLiveModeAvailable={!!process.env.OPENAI_API_KEY}
    />
  );
}
