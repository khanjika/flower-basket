/**
 * Flower.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		id: {
			columnName: 'flowerId',
			type: 'string',
			required: true,
			columnType: 'varchar'
		},
		flowerName: { columnName: 'flowerName', type: 'string', required: true },
		details: { columnName: 'details', type: 'string', columnType: 'varchar' },
		quantityAvailable: { columnType: 'quantityAvailable', type: 'number', columnType: 'int' },
		updatedAt: false,
		createdAt: false
	}
};
