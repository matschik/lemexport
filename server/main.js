import { Meteor } from "meteor/meteor";
import "./migrations";
import * as exportsModule from "/imports/exports/server";

Meteor.startup(() => {
  Migrations.migrateTo("latest");
  console.info("Migration version", Migrations.getVersion());
  exportsModule.afterRunningMigrations();
});
