var app = {
  init : function() {},
  send : function(message) {
    $.ajax({
      type: 'POST',
      url: "https://api.parse.com/1/classes/chatterbox",
      data: JSON.stringify(message),
      success: function(data){
        console.log('Message Sent!')
      },
      error: function(data){
        console.log('Message Failed')
      }
    })
  },
  fetch : function(){
    $.ajax({
      type: 'GET',
      url: "https://api.parse.com/1/classes/chatterbox",
      // data: JSON.stringify(data),
      // contentType: 'application/json',
      success: function(data){
        app.clearMessages();
        for (var i = 0; i < 10; i++) {
        $('.chats').append('<div class =feedMessage>'+_.escape(data.results[i]['username'])+": "+_.escape(data.results[i]['text'])+'</div>');
        }
    }
  })
  },
  clearMessages: function() {
    $('.feedMessage').remove();
  },
  addMessage: function(message) {
    // var newChat = document.createElement('div');
    // newChat.text = message;

    $('.chats').append("<div>" + message.username+": " + message.text + "</div>");
  },
  addRoom: function(roomName) {
    $('#roomSelect').append("<div>" + roomName + "</div>")
  },
};

$(document).ready(function(){
$('user').on('click', function() {
    $('#friends').append("<div>" + this.username + "</div>")
  });

$('#friends').on('click', function() {
  $(this).addClass('.friends')
})

var feed = function() {
  app.addMessage(app.fetch())
}
var userName = window.location.search.slice(10);

$('#username').append(userName);

$('#submit').on('click', function() {
  var mail = {
    text: userMessage.value,
    username: userName,
    room: 'Home'
  }
  app.send(mail)
});

setInterval(app.fetch, 2000);

});
