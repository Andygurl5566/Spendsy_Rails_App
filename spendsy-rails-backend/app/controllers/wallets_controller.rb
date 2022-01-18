class WalletsController < ApplicationController

  def index
    wallets = Wallet.all 
    render json: wallets
  end

  def create
    wallet = Wallet.create(wallet_params)
    if wallet.valid?
      render json: wallet, status: :created
    else
      render json: {errors: wallet.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    wallet = Wallet.find(params[:id])
    if wallet
      wallet.destroy
      head :no_content
    else
      render json: {error: 'Wallet not Found'}, status: :not_found
    end
  end

  def update
    wallet = Wallet.find(params[:id])
    wallet.update(wallet_params)
    render json: wallet
  end


  private

  def wallet_params
    params.permit(:user_id, :amount, :name)
  end
end
