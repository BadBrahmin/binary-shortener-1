desc "Ensure that code is not running in production environment"
task :not_production do
  if Rails.env.production? && ENV["DELETE_PRODUCTION_DATA"].blank?
    puts ""
    puts "*" * 50
    puts "Deleting production data is not allowed. "
    puts "If you really want to delete all production data and populate sample data then "
    puts "you can execute following command."
    puts "DELETE_PRODUCTION_DATA=1 rake setup_sample_data"
    puts " "
    puts "If you are using Heroku then execute command as shown below"
    puts "heroku run rake setup_sample_data DELETE_PRODUCTION_DATA=1 -a binary-shortener"
    puts "*" * 50
    puts ""
    throw :error
  end
end

desc "Sets up the project by running migration and populating sample data"
task setup: [:environment, :not_production, "db:drop", "db:create", "db:migrate"] do
  ["setup_sample_data"].each { |cmd| system "rake #{cmd}" }
end

def delete_all_records_from_all_tables
  ActiveRecord::Base.connection.schema_cache.clear!

  Dir.glob(Rails.root + "app/models/*.rb").each { |file| require file }

  ApplicationRecord.descendants.each do |klass|
    klass.reset_column_information
    klass.destroy_all
  end
end

desc "Deletes all records and populates sample data"
task setup_sample_data: [:environment, :not_production] do
  delete_all_records_from_all_tables

  links = [
  {original:"https://learnrubyonrails.bigbinary.com"},
  {original: "https://learnrubyonrails.bigbinary.com/docs/"},
  {original: "https://altcampus.io"},
  {original: "https://twitter.com/"},
  {original: "https://github.com/tejasaithal/"},
  {original: "https://fontawesome.com/start"},
  {original: "https://stackoverflow.com"},
  {original: "https://stackoverflow.in/"}
]

links.each do |link|
  newLink = Link.new(original: link[:original])
  newLink.save
end

  puts "sample data was added successfully"
end