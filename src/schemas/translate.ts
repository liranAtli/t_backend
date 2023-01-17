import mongoose from "mongoose";
import {Password} from "../helpers";

// An interface that describes the properties
// that are requried to create a new Translat
interface TranslatAttrs {
 userId:string;
 tKey:string;
 tValue:string;
}

// An interface that describes the properties
// that a Translat Model has
interface TranslatModel extends mongoose.Model<TranslatDoc> {
    build(attrs: TranslatAttrs): TranslatDoc;
}

// An interface that describes the properties
// that a Translat Document has
interface TranslatDoc extends mongoose.Document {
    userId:string;
    tKey:string;
    tValue:string;
}

const TranslatSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        tKey: {
            type: String,
            required: false,
        },
        tValue: {
            type: String,
            required: false,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

TranslatSchema.statics.build = (attrs: TranslatAttrs) => {
    return new Translat(attrs);
};

const Translat = mongoose.model<TranslatDoc, TranslatModel>("Translat", TranslatSchema);

export { Translat };