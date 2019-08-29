json.id         @message.id
json.content    @message.content
json.group_id   @message.group_id
json.user_id    @message.user_id
json.name       @message.user.name
json.image      @message.image
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")