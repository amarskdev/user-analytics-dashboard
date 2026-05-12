import SessionEvents from "@/components/SessionEvents";

export default async function SessionsEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SessionEvents sessionId={id} />
    </div>
  );
}
