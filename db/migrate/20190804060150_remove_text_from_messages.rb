class RemoveTextFromMessages < ActiveRecord::Migration[5.0]
  def up
    remove_column :messages, :text, :text
    remove_column :messages, :user_id, :integer
  end

  def down
    add_column :messages, :content, :string
    add_column :messages, :image, :string
    add_column :messages, :group, :references, foreign_key: true
    add_column :messages, :user, :references, foreign_key: true
  end  
end
