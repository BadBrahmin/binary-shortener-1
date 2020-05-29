Rails.application.routes.draw do
  get 'pages/index'
  namespace :api do
    namespace :v1 do
      resources :links, only: [:index, :create, :show, :update, :destroy]
      resources :categories, only: [:index, :create, :show, :update, :destroy]
    end
  end
  root 'pages#index'
  get "/*path" => 'pages#index'
end
