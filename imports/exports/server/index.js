import { Meteor } from "meteor/meteor";
import exportQueue from "./exportQueue";
import { ExportsCollection, EXPORT_STATUSES } from "../ExportsCollection";
import "./publications";
import "./methods";

export function afterRunningMigrations() {
  processExports();
}

function processExports() {
  const exportIdsToProcess = [
    ...ExportsCollection.find({
      status: { $in: [EXPORT_STATUSES.PENDING, EXPORT_STATUSES.PROGRESS] },
    })
      .fetch()
      .map(({ _id }) => _id),
  ];

  if (exportIdsToProcess.length > 0) {
    exportQueue.add(...exportIdsToProcess);
  }
}

Meteor.startup(() => {
  processExports();
});
