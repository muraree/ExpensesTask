class CreateAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :accounts do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :number
      t.string :name
      t.integer :balance, default: 1000

      t.timestamps
    end
  end
end
