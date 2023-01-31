import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const ExportsCollection = new Mongo.Collection("exports");

export const EXPORT_STATUSES = {
  PENDING: "pending",
  PROGRESS: "progress",
  COMPLETED: "completed",
};

export const EXPORT_URLS = [
  "https://www.lempire.com/",
  "https://www.lemlist.com/",
  "https://www.lemverse.com/",
  "https://www.lemstash.com/",
];

ExportsCollection.schema = new SimpleSchema({
  status: {
    type: String,
    required: true,
    allowedValues: Object.values(EXPORT_STATUSES),
  },
  progress: { type: Number, defaultValue: 0, min: 0, max: 100, required: true },
  url: {
    type: String,
    required: false,
    allowedValues: EXPORT_URLS,
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }

      // otherwise unset it
      this.unset();
    },
  },
});

ExportsCollection.attachSchema(ExportsCollection.schema);
