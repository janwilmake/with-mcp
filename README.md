A simple middleware that turns your serverless server handler + OpenAPI spec + config into a exposed MCP endpoint following the new [stateless MCP principles](https://github.com/janwilmake/stateless-mcp)

![](with-mcp.png)

See [example](example.ts) for how to use this.

Earlier work: https://github.com/janwilmake/openapi-to-mcp

> Disclaimer: Please only use this for APIs that are compliant to the MCP [Authorization spec](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization), or have no authorization. Also follow [good MCP practices](<alert('source_needed')>) for choosing how to shape your tools, prompts, and resources.

**Work in progress**: I'm working on a simpler auth plugin for your handler as well to turn any API into a GitHub Oauth Client & Provider. Eventually it will be MCP compatible. See library [here](https://github.com/janwilmake/github-oauth-client-provider)
