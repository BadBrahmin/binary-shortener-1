require 'test_helper'

class LinkTest < ActiveSupport::TestCase
  setup do
    @link1 = Link.create(original: "http://example.com")
    @link2 = Link.create(original: "http://example2.com")
  end

  test "link is valid" do
    assert @link1.valid?
  end

  test "link is invalid" do
    @link2.original = "random-string"
    assert_not @link2.valid?
    assert_equal ["Original is invalid"], @link2.errors.full_messages
  end

  test "short_hash is valid" do
    assert @link1.valid?
  end

  test "short_hash is invalid" do
    @link1.short_hash = "hfvbw3"
    assert_not @link1.valid?
  end

  test "short_hash should be unique" do
    @link2.short_hash = @link1.short_hash
    assert_not @link2.valid?
    assert_equal ["Short hash has already been taken"], @link2.errors.full_messages
  end
end
