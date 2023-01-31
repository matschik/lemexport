import {
  ExportsCollection,
  EXPORT_STATUSES,
} from "/imports/exports/ExportsCollection";

Migrations.add({
  version: 1,
  name: "Add initial exports data",
  up: function () {
    [
      {
        status: EXPORT_STATUSES.PENDING,
        progress: 0,
        url: null,
      },
      {
        status: EXPORT_STATUSES.PENDING,
        progress: 0,
        url: null,
      },
      {
        status: EXPORT_STATUSES.PROGRESS,
        progress: 10,
        url: null,
      },
      {
        status: EXPORT_STATUSES.COMPLETED,
        progress: 100,
        url: "https://www.lempire.com/",
      },
      {
        status: EXPORT_STATUSES.PROGRESS,
        progress: 10,
        url: null,
      },
    ].forEach((exportData) => {
      ExportsCollection.insert(exportData);
    });
  },
  down: function () {},
});
