import {defineField, defineType} from 'sanity'

export const orderItemType = defineType({
    name: 'orderItem',
    title: 'Pizza de la commande',
    type: 'document',
    fields: [
        defineField({
            name: 'order_item_reference',
            title: 'Pizza',
            type: 'reference',
            to: [{type: 'pizza'}],
            options: {
                disableNew: true,
                filter: 'is_available == $filter',
                filterParams: {filter: true},
            },
            validation: (v) => v.required()
            
        }),
        defineField({
            name: 'order_item_comment',
            title: 'Commentaire',
            type: 'string',
        }),
    ],
    preview: {
        select: {
        pizzaName: 'order_item_reference.name',
        pizzaPrice: 'order_item_reference.price',
        subtitle: 'order_item_comment',
        },
        prepare(selection) {
            const { pizzaName, pizzaPrice, subtitle } = selection;
            return {
                title:  pizzaName ? `${pizzaName} - ${pizzaPrice}€` : '⚠️ Pizza à définir',
                subtitle: subtitle,
                media: ''
            };
        },
    },
})