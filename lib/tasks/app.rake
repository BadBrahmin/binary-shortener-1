namespace :app do
  desc "app:encode will shorten the provided link"
  task :encode => :environment do
    session = ActionDispatch::Integration::Session.new(Rails.application)
    session.post "https://localhost:3000/api/v1/links", params: {link: {long_link:ENV['URL']}}
    response = JSON.parse(session.response.body)
    message = response["message"]
    if response["errors"]
      puts response["errors"]
      puts message
    else
      puts message
    end
  end
  
  desc "app:decode will show the original link of the provided short link"
  task :decode => :environment do
    short_hash = ENV['SHORTURL'].last(8)
    session = ActionDispatch::Integration::Session.new(Rails.application)
    session.get "http://localhost:3000/api/v1/links/#{short_hash}"
    response = JSON.parse(session.response.body)
    message = response["message"]
    if response["errors"]
      puts "No original url was found for the  short url https://www.binary-shortener.herokuapp.com/#{short_hash}"
    else
      puts message
    end
  end
end