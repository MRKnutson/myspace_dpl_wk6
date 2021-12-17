class AddFriendsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :friends, :text
    add_column :users, :liked_comments, :text
  end
end
