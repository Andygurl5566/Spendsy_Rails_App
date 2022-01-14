require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SpendsyRailsBackend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Configuration for the application, engines, and railties goes here.
    config.api_only = true
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    
    # Sessions and cookies
    config.middleware.use ActionDispatch::Cookies 
    config.middleware.use ActionDispatch::Session::CookieStore 

    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    config.action_dispatch.cookies_same_site_protection = :strict
  end
end
