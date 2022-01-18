class UsersController < ApplicationController
  before_action :authenticate_user
  skip_before_action :authenticate_user, only: [:create, :show, :user_wallet, :wallet_total]

  def index
    user = User.all
    render json: user
  end
  
  
  def show
    user = User.find(params[:id])
    if user
      render json: user, include: :wallets
    else
      render json: {error: "Not Found"}, status: :not_found
    end
  end

  def user_wallet
    user = User.find(session[:user_id])
    wallet = user.wallets.find(params[:id])
    wallet_total = wallet.total
    render json: wallet, include: :bills
  end

  def wallet_total
    user = User.find(session[:user_id])
    wallet = user.wallets.find(params[:id])
    wallet_total = wallet.total
    render json: wallet_total
  end

  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      Wallet.create(name: "#{user.first_name}'s Wallet", amount: 0, user_id: user.id)
      render json: user, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end
  end


  private


  def user_params
    params.permit( :first_name, :last_name, :email, :password, :password_confirmation)
  end

  def authenticate_user
    return render json: { error: "Not authorized" }, status: :unauthorized unless session[:user_id] == params[:id]
  end

end
