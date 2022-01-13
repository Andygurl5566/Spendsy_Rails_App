class UsersController < ApplicationController
  before_action :authenticate_user
  skip_before_action :authenticate_user, only: [:create, :show]

  def show
    user = User.find(params[:id])
    if user
      render json: user
    else
      render json: {error: "Not Found"}, status: :not_found
    end
  end

  def create
    user = User.create(user_params)
    byebug
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def user_wallets
    @current_user.wallets
  end


  private

  def user_params
    params.permit(:id, :first_name, :last_name, :email, :password, :password_confirmation)
  end

  def authenticate_user
    return render json: { error: "Not authorized" }, status: :unauthorized unless session[:user_id] == params[:id]
  end

end
