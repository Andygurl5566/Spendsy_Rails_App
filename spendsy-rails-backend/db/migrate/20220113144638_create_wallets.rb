class CreateWallets < ActiveRecord::Migration[6.1]
  def change
    create_table :wallets do |t|
      t.string :name
      t.integer :user_id
      t.integer :amount

      t.timestamps
    end
  end
end
