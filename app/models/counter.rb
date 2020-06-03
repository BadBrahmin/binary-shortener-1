class Counter < ApplicationRecord
  belongs_to :links, optional: true
end
