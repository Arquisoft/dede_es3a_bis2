Feature: Get to see a product details

Scenario: A user enters the webpage
    Given Homepage
    When I click one product
    Then Product details are displayed