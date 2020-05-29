class Link < ApplicationRecord
  before_validation :generate_short_hash, on: [:create]
  validates :original, presence: true, format: { with: URI::regexp(%w(http https))}
  validates :short_hash, presence: true, uniqueness: true, length: { is: 8 }

  private
    def generate_short_hash
      loop do
        short_hash = SecureRandom.hex(4)
        self.short_hash = "#{short_hash}"
        break short_hash unless Link.where( short_hash: self.short_hash ).present?
      end
    end
end
