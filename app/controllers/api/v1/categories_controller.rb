class Api::V1::CategoriesController < ApplicationController
  before_action :load_category, only: [:show, :update, :destroy]
  
  def index
    @categories = Category.order(updated_at: :desc)
    render json: @categories
  end

  def create
    @category = Category.find_by(category_params)
    
    if @category
      render status: :ok, json: { category: @category, 
        :message => "Category #{@category.name} already exists!" }
    else
      @category = Category.new(category_params)
      if @category.save
        render status: :ok, json: { category: @category, 
          :message => "Category #{@category.name} created!" }
      else
        render status: :unprocessable_entity, json: { errors: @category.errors.full_messages, 
          :message => "Failed to save category." }
      end
    end
  end

  def destroy
    if @category.destroy
      render status: :ok, json: { :message => "Category successfully deleted!" }
    else
      render status: :unprocessable_entity, json: { errors: @category.errors.full_messages, 
        :message => "Failed to delete category." }
    end
  end

  private

    def category_params
      params.require(:category).permit(:name, :color)
    end

    def load_category
      @category = Category.find_by!(id: params[:id])
    end
end
