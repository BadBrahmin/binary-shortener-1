class Api::V1::CountersController < ApplicationController

  def index
    @counts = Counter.all.group_by { |counter| counter.created_at.strftime("%B %Y")}
    render json: { counts: @counts }
  end
end
