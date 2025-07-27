// MCP Server
import { Hono } from 'hono';
import { MoldMCP } from '../mcp/mcpServer.js';

function setupMCPRoutes(app:Hono) {
  // Serve SSE transport (for backward compatibility if needed)
  app.get('/sse', async (c) => {
    // Handle SSE connections and stream agent notifications
    return await MoldMCP.serveSSE("/sse").fetch(c.req.raw, c.env, c.executionCtx);
  });
  app.post('/sse/message', async (c) => {
    // Handle SSE connections and stream agent notifications
    return await MoldMCP.serveSSE("/sse").fetch(c.req.raw, c.env, c.executionCtx);
  });

  // Serve Streamable HTTP transport
  app.on(['GET', 'POST'], '/mcp', async (c) => {
    // Handle incoming MCP requests and call agent methods
    return await MoldMCP.serve("/mcp").fetch(c.req.raw, c.env, c.executionCtx);
  })
}

export {
  setupMCPRoutes
}
