odoo.define('custom_product.cart_quantity_discount', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');
    console.log('hi')

    publicWidget.registry.websiteSaleCart = publicWidget.Widget.extend({
        selector: '.oe_website_sale',
        events: {
            'click .js_quantity_change': '_onQuantityChange',  // Capture quantity change events
        },

        /**
         * Method to handle quantity change buttons (plus and minus)
         * This will check for discounted price and update the price accordingly.
         */
        _onQuantityChange: function (ev) {
            var $input = $(ev.currentTarget).closest('tr').find('input[name="add_qty"]');
            var quantity = parseFloat($input.val()) || 0;
            var productId = $input.data('product-id');  // Assuming product ID is stored in a data attribute
            var $line = $(ev.currentTarget).closest('tr');

            // Fetch the product's price and discount information
            var productPrice = parseFloat($line.find('.product-price').data('list-price'));  // original price
            var discountedPrice = parseFloat($line.find('.product-price').data('discounted-price'));  // discounted price
            var discountPercentage = parseFloat($line.find('.product-price').data('discount-percentage'));

            // Determine the price to use: either discounted or original price
            var priceToUse = discountedPrice > 0 ? discountedPrice : productPrice;

            // Handle plus and minus operations
            if ($(ev.currentTarget).data('operation') === 'plus') {
                quantity += 1;
            } else if ($(ev.currentTarget).data('operation') === 'minus' && quantity > 1) {
                quantity -= 1;
            }

            // Update the input value for quantity
            $input.val(quantity).trigger('change');

            // Update the line total (quantity * price)
            var lineTotal = quantity * priceToUse;
            $line.find('.line-total').text(lineTotal.toFixed(2));  // Display the updated line total

            // Trigger a cart update (optional)
            this._updateCartTotal();
        },

        /**
         * Method to update the cart total based on all line items.
         */
        _updateCartTotal: function () {
            var total = 0;
            $('.oe_website_sale .line-total').each(function () {
                total += parseFloat($(this).text()) || 0;
            });
            $('#cart_total').text(total.toFixed(2));  // Update the cart total display
        },
    });
});
