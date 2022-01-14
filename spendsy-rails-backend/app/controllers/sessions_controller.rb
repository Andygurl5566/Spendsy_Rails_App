class SessionsController < ApplicationController

  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id 
      render json: user, status: :created 
    else
      render json: {error: "Invalid Username or Password"}, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

  def show
    user = @current_user
    if user
      render json: user 
    else
      render json: {error: "User not found"}, status: :unauthorized
  end
end


end
