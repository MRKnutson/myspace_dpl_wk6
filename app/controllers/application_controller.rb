class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken

        before_action :configure_permitted_parameters, if: :devise_controller?

        protected

        def configure_permitted_parameters
        devise_parameter_sanitizer.permit :sign_up, keys: [:comment, :nickname, :image]
        devise_parameter_sanitizer.permit :account_update, keys: [:comment, :nickname, :image]
        end
end
