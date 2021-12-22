Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :users, only: [:index, :update] do
      get 'my_friends', to: 'users#my_friends'
      resources :comments
    end
  end
end
