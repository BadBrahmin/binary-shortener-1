class CreateCounters < ActiveRecord::Migration[6.0]
  def change
    create_table :counters do |t|
      t.references :link, null: false, foreign_key: true

      t.timestamps
    end
  end
end
