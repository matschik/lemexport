import { Meteor } from "meteor/meteor";
import { ExportsCollection, EXPORT_STATUSES } from "../ExportsCollection";
import exportQueue from "./exportQueue";

Meteor.methods({
  "exports.insert"() {
    const id = ExportsCollection.insert({
      status: EXPORT_STATUSES.PENDING,
      progress: 0,
      url: null,
    });
    exportQueue.add(id);
  },
});
