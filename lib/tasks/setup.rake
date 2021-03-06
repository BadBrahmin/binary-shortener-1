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
    {original:"https://bigbinary.com/jobs"},
    {original: "https://learnrubyonrails.bigbinary.com/docs/"},
    {original: "https://altcampus.io"},
    {original: "https://twitter.com/"},
    {original: "https://github.com/tejasaithal/"},
    {original: "https://fontawesome.com/start"},
    {original: "https://stackoverflow.com"},
    {original: "https://hypebeast.com/"},
    {original: "https://producthunt.com/"},
    {original: "https://basecamp.com/"},
    {original: "https://betalist.com/"}
  ]
  categories = [
    {name: "research", color: "#4287f5"},
    {name: "read-later", color: "#11fa34"},
    {name: "marketing", color: "#f08d02"},
    {name: "content", color: "#fa11f2"}
  ]

  puts ""
  puts "creating links..."

  links.each do |link|
    newLink = Link.new(original: link[:original])
    newLink.save
  end

  puts ""
  puts "creating categories..."

  categories.each do |category|
    newCategory = Category.new(name: category[:name], color: category[:color])
    newCategory.save
  end

  puts ""
  puts "ringing the counters..."
  
  Link.all.each do |link|
    rand(5...15).times {
      @link = Link.find_by!(id: link.id)
      @link.increment!(:count)
      @counter = Counter.create(link_id: link.id, created_at: rand(1..100).days.ago)
    }
  end
  
  puts ""
  puts "sample data was added successfully!"
end