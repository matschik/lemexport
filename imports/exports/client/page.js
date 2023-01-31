import { Template } from "meteor/templating";
import { ExportsCollection } from "../ExportsCollection";
import "./page.html";
import "./components/spinner.html";
import "./components/exportsTable/exportsTable.js";

const IS_LOADING_STRING = "isLoading";

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();

  const handler = Meteor.subscribe("exports.list");

  Tracker.autorun(() => {
    this.state.set(IS_LOADING_STRING, !handler.ready());
  });
});

Template.mainContainer.helpers({
  exports() {
    return ExportsCollection.find({}, { sort: { createdAt: -1 } });
  },
  hasExports() {
    return ExportsCollection.find().count() > 0;
  },
  isLoading() {
    const instance = Template.instance();
    return instance.state.get(IS_LOADING_STRING);
  },
});

Template.form.events({
  "submit #export-form-insert"(event) {
    event.preventDefault();
    Meteor.call("exports.insert");
  },
});
