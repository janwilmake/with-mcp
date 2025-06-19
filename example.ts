import { withMcp } from "./mod";
import openapi from "./openapi.json";
// Define the OpenAPI specification for our API

type Env = {};
// Export the handler wrapped with MCP functionality
export default {
  fetch: withMcp(
    // YOUR REGULAR Cloudflare Handler
    async (request: Request, env: Env, ctx: ExecutionContext) => {
      const url = new URL(request.url);

      // Handle POST /add endpoint
      if (url.pathname === "/add" && request.method === "POST") {
        try {
          const body = (await request.json()) as { a: number; b: number };

          // Validate input
          if (typeof body.a !== "number" || typeof body.b !== "number") {
            return new Response(
              JSON.stringify({
                error: "Both a and b must be numbers",
              }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          // Perform addition
          const result = body.a + body.b;

          return new Response(JSON.stringify({ result }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({
              error: "Invalid JSON in request body",
            }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      }

      // Handle other routes or return 404
      return new Response(
        `Hello, world! This is the 'with-mcp' example.
    
Please connect to https://with-mcp.wilmake.com/mcp in your inspector (run 'npx @modelcontextprotocol/inspector'), and see the equivalent tool as defined in this worker by using this curl:
    
"""
curl -X POST https://with-mcp.wilmake.com/add \
  -H "Content-Type: application/json" \
  -d '{"a": 5, "b": 3}'
# Returns: {"result": 8}
"""
`,
        { status: 404 },
      );
    },
    openapi,
    {
      // MCP configuration - expose the addNumbers operation as a tool
      promptOperationIds: [],
      toolOperationIds: ["addNumbers"],
      resourceOperationIds: [],
      protocolVersion: "2025-03-26",
    },
  ),
};
