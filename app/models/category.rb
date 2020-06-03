class Category < ApplicationRecord
  before_validation :category_downcase
  has_many :links, :dependent => :nullify
  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }
  validates :color, presence: true, length: { is: 7 }

  private
    def category_downcase
      self.name = name.downcase
    end
end
