Tasks = new Meteor.Collection('tasks');

if (Meteor.isClient) {
  Template.hello.rendered = function() {
    new Vue({
      el: '#vue-demo',
      data: {
        message: ""
      },
      sync: {
        "tasks" : function(){
          return Tasks.find();
        }
      },
      methods: {
        addTask : function(){
          this.massage = "";

          if (! Meteor.userId()) {
            this.message = "ログインしてください！";
            throw new Meteor.Error("not-authorized");
          }

          var self = this;
          Tasks.insert({
            name: this.taskName,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().services.twitter.screenName
          }, function(err, id){
            if(err){
              console.warn(err);
            }
            self.taskName = "";
          })
        },
        removeTask : function(id){
          Tasks.remove(id)
        }
      }
    });
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
