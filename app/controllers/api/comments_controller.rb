class Api::CommentsController < ApplicationController
  before_action :set_user
  before_action :set_comment, only: [:show, :update, :destroy]
  
  def index
    render json: @user.comments
  end

  def show
    render json: @comment
  end

  def create
    @comment = @user.comments.new(comment_params)
    if(@comment.save)
      render json: @comment
    else
      render json: {errors: @comment.errors}, status: 422
    end
  end

  def update
    if(@comment.update(comment_params))
      render json: @comment
    else
      render json: {errors: @comment.errors}, status: 422
    end
  end

  def destroy
    render json: @comment.destroy
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_comment
    @comment = @user.comments.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:comment)
  end

end
