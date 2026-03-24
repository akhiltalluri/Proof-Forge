import ForgePageClient from "@/components/ForgePageClient";

export default function ForgePage() {
  return (
    <ForgePageClient
      initialDemoMode={process.env.DEMO_MODE === "true"}
      initialLiveModeAvailable={!!process.env.OPENAI_API_KEY}
    />
  );
}
