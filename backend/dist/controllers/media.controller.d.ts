import type { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}
export declare const uploadMiddleware: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const uploadMedia: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const getAllMedia: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=media.controller.d.ts.map