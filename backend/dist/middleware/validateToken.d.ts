import type { NextFunction, Request, Response } from "express";
export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}
export declare const validateToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validateToken.d.ts.map