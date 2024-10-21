# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
from odoo import api, fields, models, _
# from odoo.tools import amount_to_text_en, float_round
# from datetime import datetime, timedelta
# from odoo.tools import float_is_zero, float_compare, DEFAULT_SERVER_DATETIME_FORMAT
from odoo.exceptions import UserError, RedirectWarning, ValidationError



class ProductTemplate(models.Model):
	_inherit = 'product.template'
	

	discount_percentage = fields.Float(
	string="Discount Percentage", 
	help="Percentage discount to be applied on the product price.")



	discounted_price = fields.Float(
		string="Discounted Price", 
		compute='_compute_discounted_price', 
		store=True)
	
	@api.depends('list_price', 'discount_percentage')
	def _compute_discounted_price(self):
		"""Compute the discounted price based on discount_percentage"""
		for product in self:
			if product.discount_percentage:
				product.discounted_price = product.list_price * (1 - (product.discount_percentage / 100))
			else:
				product.discounted_price = product.list_price
				
	
	_sql_constraints = [
	('default_code_unique', 'unique(default_code)', "A Internal Reference can only be assigned to one product !")
	]
