Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :links, only: [:index, :create, :show, :update, :destroy]
      resources :categories, only: [:index, :create, :show, :update, :destroy]
    end
  end
end
