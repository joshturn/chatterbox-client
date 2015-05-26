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
  fetch : function(data){
    $.ajax({
      type: 'GET',
      url: "https://api.parse.com/1/classes/chatterbox",
      success: function(data){
        $('.chats').append('<div>'+data.username+" : "+data.text)
      }
    })
  },
  clearMessages: function() {
    $('#chats').remove();
  },
  addMessage: function(message) {
    // var newChat = document.createElement('div');
    // newChat.text = message;
    $('#chats').append("<div>" + message.text + "</div>");
  },
  addRoom: function(roomName) {
    $('#roomSelect').append("<div>" + roomName + "</div>")
  },
};

$('user').on('click', function() {
    $('.friends').append("<div>" + this.username + "</div>")
  });

$('.friends').on('click', function() {
  $(this).addClass('.friends')
})

var feed = function() {
  app.addMessage(app.fetch())
}
