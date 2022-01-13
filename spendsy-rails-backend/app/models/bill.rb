class Bill < ApplicationRecord
  belongs_to :wallet
  belongs_to :user
end
