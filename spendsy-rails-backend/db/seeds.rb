# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


test1 = User.create(first_name: "Aidan", last_name: "Margo", email: "test2@gmail.com", password:"87654321")
test2 = User.create(first_name: "Andy", last_name: "Freeman", email: "test@gmail.com", password:"12345678")


testwallet1= Wallet.create(name: "WorkMulla", user_id: test1.id, amount:40000000000000)
testwallet1= Wallet.create(name: "Vacation Money", user_id: test2.id, amount:45670000000)
testwallet1= Wallet.create(name: "General", user_id: test1.id, amount:68943200000)