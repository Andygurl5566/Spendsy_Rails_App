Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # Session Routes
  get '/me', to: "sessions#show"
  
  post '/login', to: "sessions#create"

  delete '/logout', to: "sessions#destroy"

  # User Routes
  post '/signup', to: 'users#create'

  get '/users/:id', to: 'users#show'

  # Wallet Routes
  resources :wallets

  # Bill Routes
  resources :bills

end
