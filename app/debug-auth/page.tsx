import { auth } from "@/auth";

export default async function DebugAuth() {
  const session = await auth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Page</h1>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-semibold mb-2">Session Data:</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <div className="mt-4">
        <p>
          <strong>Is Authenticated:</strong>{" "}
          {session?.user ? "✅ Yes" : "❌ No"}
        </p>
        {session?.user && (
          <>
            <p>
              <strong>User ID:</strong> {session.user.id}
            </p>
            <p>
              <strong>Email:</strong> {session.user.email}
            </p>
            <p>
              <strong>Name:</strong> {session.user.name}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
