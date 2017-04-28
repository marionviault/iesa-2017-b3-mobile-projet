angular.module('starter.services', [])

.factory('Chats', function() {

  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png',
    isContact:"non",
    check:false
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png',
    isContact:"non",
    check:false
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
    isContact:"non",
    check:false
  }, {
    id: 3,
    name: 'Kate Bell',
    lastText: 'Look at my mukluks!',
    face: 'img/marjo.jpeg',
    isContact:"non",
    check:false
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png',
    isContact:"non",
   check:false
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    searchContact: function(chatName, chatId){
         var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
         var options      = new ContactFindOptions();
         options.filter   = chatName;
         options.multiple = false;
         options.desiredFields = [navigator.contacts.fieldType.id];
         options.hasPhoneNumber = true;

        navigator.contacts.find(fields, function(contacts){
           if(contacts.length > 0) chats[chatId].isContact = "oui";
        }, function(){
              console.log("une erreur s'est produite")
        }, options);
    }
  };
});
