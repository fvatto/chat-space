class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @message.user_id = current_user.id
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = @group.messages.new(message_params)
    @message.user_id = current_user.id
    if @message.save
      respond_to do |format|
        format.html {redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end  
  end

  private

  def message_params
    params.require(:message).permit(:content, :image, :user_id).merge(group_id: params[:group_id])
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
