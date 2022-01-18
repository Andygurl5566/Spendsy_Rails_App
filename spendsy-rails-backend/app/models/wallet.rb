class Wallet < ApplicationRecord
  belongs_to :user
  has_many :bills, dependent: :destroy

  def total
    self.bills.sum('bill_amount')
  end

end
