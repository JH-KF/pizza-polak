import {defineField, defineType} from 'sanity'

export const pizzaType = defineType({
    name: 'pizza',
    title: 'Pizza',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nom',
            type: 'string',
            validation: (v) => v.required()
        }),
        defineField({
            name: 'price',
            title: 'Prix',
            type: 'number',
            validation: (v) => v.required()
        }),
        defineField({
            name: 'ingredients',
            title: 'Ingrédients',
            type: 'string',
            validation: (v) => v.required()
        }),
        defineField({
            name: 'pizza_section',
            title: 'Section',
            type: 'string',
            options: {
                layout: 'radio',
                list: [{value: 'pizza', title: 'Pizza'},{value:'season', title: "Pizza de saison"}, {value:'flamm', title: "Flamm"}]
            },
            initialValue: 'pizza',
            validation: (v) => v.required()
        }),
        defineField({
            name: 'is_available',
            title: 'Disponible',
            type: 'boolean',
            initialValue: true,
            validation: (v) => v.required()
        }),
    ],
    preview: {
        select: {
            name: 'name',
            isAvailable: 'is_available',
            price: 'price',
        },
        prepare(selection) {
            const { name, isAvailable, price } = selection;
            return {
                title: `${name} - ${price}€`,
                subtitle: isAvailable ? "✅ Visible" : "❌ Non visible",
                media: ''
            };
        },
    },
})