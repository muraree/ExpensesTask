class SessionsController < Devise::SessionsController

  def create
    user = User.find_by_email(params[:email])

    if user && user.valid_password?(params[:password])
      @current_user = user
      render json: {user: user, token: user.generate_jwt }
    else
      render json: {
        errors: {
          'email or password' => ['is invalid']
        }
      }, status: :unprocessable_entity
    end
  end
end
