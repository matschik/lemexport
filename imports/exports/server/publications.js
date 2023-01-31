import { Meteor } from "meteor/meteor";
import { ExportsCollection } from "../ExportsCollection";

Meteor.publish("exports.list", function publishExports() {
  return ExportsCollection.find({}, { sort: { createdAt: -1 } });
});
