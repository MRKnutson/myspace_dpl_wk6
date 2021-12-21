# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :comments, dependent: :destroy
  serialize :liked_comments, Array
  serialize :friends, Array
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  # class method
  def self.not_friends(ids)
    ids = ids.empty? ? [0] : ids
    User.where("id NOT IN (?)", ids).order("RANDOM()")
  end

  def self.user_friends(ids)
    ids = ids.empty? ? [0] : ids
    friends = User.where("id IN (?)", ids)
    friends.map do |friend|
      {id: friend.id, email: friend.email, nickname: friend.nickname, image: friend.image, comments: friend.comments.reverse}
    end
  end
end
