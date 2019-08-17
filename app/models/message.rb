class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  mount_uploader :image,  MessageImageUploader

  validates :content, presence: true, unless: :image?
end
