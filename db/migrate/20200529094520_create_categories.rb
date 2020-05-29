class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name, null: false, unique: true
      t.string :color, null: false, unique: true
      t.index :name, name: "index_categories_on_name", unique: true
      
      t.timestamps
    end
    add_reference :links, :category
    add_foreign_key :links, :categories
  end
end
