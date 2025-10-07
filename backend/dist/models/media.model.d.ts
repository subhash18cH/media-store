import { Schema, Document } from "mongoose";
export interface IMedia extends Document {
    title: string;
    description?: string;
    url: string;
    cloudinaryId: String;
    type: String;
    ownerId: Schema.Types.ObjectId;
}
export declare const Media: import("mongoose").Model<IMedia, {}, {}, {}, Document<unknown, {}, IMedia, {}, {}> & IMedia & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=media.model.d.ts.map