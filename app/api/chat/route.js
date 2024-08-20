import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json(); // Parse the incoming request body as JSON
  console.log("Received data:", data);

  // Send the received array directly to the external API
  const response = await fetch(
    "https://rag-abdulsz-abduls-projects-03968352.vercel.app/rag/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: data }), // Send the data directly as the body
    }
  );

  const result = await response.json();

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const content = result.response;
        if (content) {
          const text = encoder.encode(content);
          controller.enqueue(text);
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}