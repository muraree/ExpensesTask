class Account < ApplicationRecord
  belongs_to :user
  has_many :expenses, dependent: :destroy

  validates :number, :name, presence: true
  validates :number, uniqueness: true

  def sufficient_balance?(requested_amount)
    (balance - requested_amount).positive?
  end

  def update_balance
    update(balance: balance_left)
  end

  def balance_left
    balance - expenses.last.amount
  end
end
