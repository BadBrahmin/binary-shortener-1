class CreateLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :links do |t|
      t.string :original, null: false
      t.string :short_hash, null: false
      t.boolean :pinned, null: false, default: false
      t.index :short_hash, name: "index_links_on_short", unique: true

      t.timestamps
    end
  end
end
