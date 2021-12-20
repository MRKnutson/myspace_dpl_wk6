# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "faker"

User.destroy_all

u1 = User.create(email:"test@test.com", password: 123456, nickname: "Tester1", image: Faker::Avatar.image)

10.times do
  u1.comments.create(body: Faker::Quote.famous_last_words)
end

10.times do
  user = User.create(
    email:Faker::Internet.unique.email, 
    password: Faker::Internet.password(min_length: 6),
    nickname: Faker::Internet.username,
    image: Faker::Avatar.image,
  )
  10.times do
    user.comments.create(
      body: Faker::Quote.famous_last_words
    )
  end
end