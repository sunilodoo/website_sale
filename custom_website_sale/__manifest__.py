# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Custom Website Sale',
    # 'version': '14.0',
    'author': "Sunil",
    'category': 'custom',
    # 'sequence': 51,
    # 'summary': 'Product ',
    'description': """Product,     """,
    'website': 'https://www.gggg.com',
    'depends': ['sale', 'product','website_sale'],
    'data': [
     
        'views/product_template_views.xml',
     
        'views/website_view.xml',

   
        'security/ir.model.access.csv',
    ],
    'test': [
        
    ],
    'demo': [
       
    ],
    'installable': True,
    'auto_install': False,
    'application': True,
}
