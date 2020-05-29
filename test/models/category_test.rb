require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  setup do
    @category = Category.create(name: "example", color: "#FF0000")
    @category2 = Category.new(name: "sample", color: "#FF0000")
  end

  test "category is valid" do
    assert @category.valid?
  end

  test "category name should be present" do
    @category.name = ""
    assert_not @category.valid?
  end

  test "category name should be unique" do
    @category2.name = @category.name
    assert_not @category2.valid?
    assert_equal ["Name has already been taken"], @category2.errors.full_messages
  end

  test "color is valid" do
    assert @category.valid?
  end

  test "color is invalid" do
    @category.color = "#ff"
    assert_not @category.valid?
  end
end
