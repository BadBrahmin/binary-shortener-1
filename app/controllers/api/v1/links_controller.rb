class Api::V1::LinksController < ApplicationController
  before_action :load_links_and_categories, only: [:index]
  before_action :load_link, only: [:show, :update, :destroy]

  def index
    render json: { links: @links}
  end

  def create
    @link = Link.find_by(link_params)

    if @link
      render status: :ok, json: { link: @link, 
        :message => "Link exists: http://short.is/#{@link.short_hash}" }
    else
      @link = Link.new(link_params)
      if @link.save
        render status: :ok, json: { link: @link, 
          :message => "Link shortened to http://short.is/#{@link.short_hash}" }
      else
        render status: :unprocessable_entity, json: { errors: @link.errors.full_messages, 
          :message => "Failed to save #{@link.original}" }
      end
    end
  end

  def show
    if @link
      render status: :ok, json: { link: @link, 
        :message => "The original url of https://short.is/#{@link.short_hash} is #{@link.original}" }
    else
      render status: :not_found, json: { :errors => @link.errors, 
        :message => "No record was found for https://short.is/#{@link.short_hash}" }
    end
  end

  def update
    if @link.update(link_params)
      @links = Link.order(pinned: :desc, updated_at: :desc)

      render status: :ok, json: { updated_link: @link, links: @links, 
        :message => "Link Updated!" }
    else
      render status: :unprocessable_entity, json: { errors: @link.errors.full_messages, 
        :message => "Update Failed" }
    end
  end

  def destroy
    if @link.destroy
      render status: :ok, json: { :message => "Successfully deleted link." }
    else
      render status: :unprocessable_entity, json: { errors: @link.errors.full_messages }
    end
  end

  private

    def link_params
      params.require(:link).permit(:original, :pinned)
    end

    def load_links_and_categories
      @links = Link.order(pinned: :desc, updated_at: :desc)
    end

    def load_link
      @link = Link.find_by!(id: params[:id])
    end
end