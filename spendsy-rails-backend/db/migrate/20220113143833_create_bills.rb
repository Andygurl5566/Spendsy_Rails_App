class CreateBills < ActiveRecord::Migration[6.1]
  def change
    create_table :bills do |t|
      t.string :bill_name
      t.integer :bill_amount
      t.string :category_name
      t.integer :wallet_id

      t.timestamps
    end
  end
end
