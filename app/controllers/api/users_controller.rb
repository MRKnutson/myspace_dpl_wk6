class Api::UsersController < ApplicationController

  before_action :authenticate_user!

  def index
    render json: User.not_friends(current_user.friends)
  end

  def update
    current_user.friends<<params[:id].to_i
    current_user.save
  end

  def my_friends
    render json: User.user_friends(current_user.friends)
  end


end
