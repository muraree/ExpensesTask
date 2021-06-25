class Expense < ApplicationRecord
  validates :amount, :date, :description, presence: true
  validates :amount, numericality: { greater_than: 0, only_integer: true }

  belongs_to :account

  before_validation :eligible?

  after_save :update_account_balance

  def update_account_balance
    account.update_balance
  end

  def eligible?
    return if account.sufficient_balance?(amount)

    self.errors.add(:base, 'Insufficient Balance')
  end
end
