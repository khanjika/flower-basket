/**
 * Basket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		id: {
			columnName: 'basketId',
			type: 'string',
			required: true,
			columnType: 'varchar'
		},
		basketName: { columnName: 'basketName', type: 'string', required: true },
		details: { columnName: 'details', type: 'string', columnType: 'varchar' },
		quantityAvailable: { columnType: 'quantityAvailable', type: 'number', columnType: 'int' }
	},
	tableName: 'wickerBasket'
};
