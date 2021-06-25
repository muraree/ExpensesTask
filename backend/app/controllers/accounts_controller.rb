class AccountsController < ApplicationController
  before_action :set_account, only: %w[show update destroy]

  def index
    render json: current_user.accounts.order(date: :desc)
  end

  def show
    render json: @account
  end

  def create
    @account = current_user.accounts.create(account_params)
    render json: @account
  end

  def update
    @account.update(account_params)
    render json: @account
  end

  def destroy
    @account.destroy
  end

  private

  def set_account
    @account = Account.find(params[:id])
  end

  def account_params
    params.require(:account).permit(:number, :name)
  end
end

