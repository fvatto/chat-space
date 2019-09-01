$(function() {
  function buildHTML(message){
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message-about">
                    <div class="message-about__user">
                      ${message.name}
                    </div>
                    <span class="message-about__time">
                      ${message.created_at}
                    </span>
                  </div>
                  <div class="message__message">
                    <p class="message__message__content">
                      ${message.content}
                    </p>`
                  if (message.image.url === null) {
                    var html2 = html + `</div>
                                </div>`
                    return html2;
                  } else {
                    var html2 = html + `<img src="${message.image.url}">
                                          </div>
                                        </div>`
                    return html2;
                  }
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data) {
      var html = buildHTML(data);
      $('.message-details').append(html);
      $('.message-form')[0].reset();
      $('.send-button').prop('disabled', false);
      $('.message-details').animate({scrollTop: $('.message-details')[0].scrollHeight}, 'fast');
    })

    .fail(function() {
      alert('メッセージの送信に失敗しました');
      $('.send-button').attr('disabled', false);
    })
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data('id');
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $('.message-details').append(insertHTML);
        })
        $('.message-details').animate({scrollTop: $('.message-details')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('メッセージの自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});