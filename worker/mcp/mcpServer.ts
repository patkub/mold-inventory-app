import { D1Database } from '@cloudflare/workers-types';

import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createPrismaClient } from '../prismaClient.js'
import { z } from "zod";
import { zMold } from '../routes/zMolds.js';

interface McpAgentEnv extends Env {
  MOLD_DB: D1Database;
}

// Define our MCP agent with tools
export class MoldMCP extends McpAgent<McpAgentEnv> {
  server = new McpServer({
    name: "Mold Management",
    version: "1.0.0",
  });

  async init() {

    // Add a mold tool
    this.server.tool(
      "add-mold",
      "Tool to add a new mold",
      {
        ...zMold.shape
      },
      async (mold) => {
        console.log(`Add mold tool called with: ${JSON.stringify(mold)}`);

        try {
          // Prisma adapter
          const prisma = createPrismaClient(this.env.MOLD_DB);

          // create new mold in database
          const createdMold = await prisma.molds.create({
            data: mold
          })

          // return the new mold as json
          return { content: [{ type: "text", text: `Added mold ${createdMold.number}.` }] };

        } catch (error) {
          return { content: [{ type: "text", text: "Failed to add new mold." }] };
        }

      }
    );


  }
}