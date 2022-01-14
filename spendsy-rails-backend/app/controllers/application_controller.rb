class ApplicationController < ActionController::Base
  include ActionController::Cookies 

  def current_user
    @current_user = User.find(session[:id])
  end

  def logged_in?
    !!current_user
  end

 

  
end
