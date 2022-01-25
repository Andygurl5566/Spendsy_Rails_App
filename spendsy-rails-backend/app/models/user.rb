class User < ApplicationRecord
  has_secure_password

  has_many :wallets
  has_many :bills, through: :wallets

  validates :first_name, :last_name, :email, :password, presence: true
  validates :email, email: true
  validates :password, length: {minimum: 8, too_short: 'Passwords must be at least 8 characters in length'}
  

  def total
    
  end
end
