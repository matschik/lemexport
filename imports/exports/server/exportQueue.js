import { Meteor } from "meteor/meteor";
import { ExportsCollection } from "../ExportsCollection";
import InMemoryIntervalQueue from "./InMemoryIntervalQueue";
import { EXPORT_URLS, EXPORT_STATUSES } from "../ExportsCollection";

const exportQueue = new InMemoryIntervalQueue(
  Meteor.bindEnvironment(function processExportId(id) {
    let exportData = ExportsCollection.findOne(id);
    if (!exportData) {
      return true;
    }

    if (exportData.status === EXPORT_STATUSES.PENDING) {
      ExportsCollection.update(id, {
        $set: {
          status: EXPORT_STATUSES.PROGRESS,
          progress: 5,
        },
      });
      return false;
    } else if (exportData.status === EXPORT_STATUSES.PROGRESS) {
      const documentSet = {};

      let nextProgress = exportData.progress + 5;
      if (nextProgress > 100) {
        nextProgress = 100;
      }

      documentSet.progress = nextProgress;
      documentSet.status =
        nextProgress === 100
          ? EXPORT_STATUSES.COMPLETED
          : EXPORT_STATUSES.PROGRESS;
      documentSet.url =
        documentSet.status === EXPORT_STATUSES.COMPLETED
          ? getRandomItem(EXPORT_URLS)
          : null;

      ExportsCollection.update(id, {
        $set: documentSet,
      });

      return documentSet.status === EXPORT_STATUSES.COMPLETED;
    } else {
      return true;
    }
  })
);

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default exportQueue;
