class ExpensesController < ApplicationController
  before_action :set_account, only: %w[create index]

  rescue_from ActiveRecord::RecordInvalid do |error|
    expense = error.record
    render json: expense.errors, status: :bad_request
  end

  def index
    render json: @account.expenses.order(date: :desc)
  end

  def show
    expense = Expense.find(params[:id])
    render json: expense
  end

  def create
    @expense = @account.expenses.create(expense_params)
    if @expense.valid?
      render json: @expense
    else
      render json: {
        errors: @expense.errors.full_messages,
      }, status: :unprocessable_entity
    end
  end

  def update
    expense = Expense.find(params[:id])
    expense.update(expense_params)
    render json: expense
  end

  def destroy
    expense = Expense.find(params[:id])
    expense.destroy
  end

  private

  def set_account
    @account = Account.find(params[:account_id])
  end

  def expense_params
    params.permit(:amount, :date, :description)
  end
end
