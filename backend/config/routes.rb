Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: :sessions },
                      path_names: { sign_in: :login }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :expenses, only: [:index, :show, :create, :update, :destroy]
  resources :accounts
end
