// server/vite.ts
import path from "path";
import { fileURLToPath } from "url";
import { ViteDevServer, createServer as createViteServer } from "vite";
import express, { Request, Response, NextFunction } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function setupVite(app: express.Application) {
  const vite: ViteDevServer = await createViteServer({
    server: { middlewareMode: true },
    root: path.resolve(__dirname, "../client"),
    appType: "custom",
  });

  app.use(vite.middlewares);

  // Example SSR handler (adjust paths as needed)
  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = req.originalUrl;

      const templatePath = path.resolve(__dirname, "../client/index.html");
      let template = await vite.transformIndexHtml(url, templatePath);

      const render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      const appHtml = await render(url);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
