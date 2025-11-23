import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import type { IncomingMessage } from "http";
import { registerRoutes } from "./routes";
import { log } from "./logger";

declare module "http" {
  interface IncomingMessage {
    rawBody?: unknown;
  }
}

const app = express();

app.use(
  express.json({
    verify: (req: Request & IncomingMessage, _res: Response, buf: Buffer) => {
      req.rawBody = buf;
    },
  }),
);
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, unknown> | undefined;

  const originalJson = res.json.bind(res);
  res.json = ((body: unknown, ...args: unknown[]) => {
    capturedJsonResponse = body as Record<string, unknown>;
    return originalJson(body, ...(args as []));
  }) as typeof res.json;

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        try {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        } catch (_error) {
          // ignore serialization failures
        }
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

registerRoutes(app);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const error = err as { status?: number; statusCode?: number; message?: string };
  const status = error.status || error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(status).json({ message });
  throw err;
});

export default app;
