import {defineField, defineType} from 'sanity'

export const globalConfigurationType = defineType({
    name: 'globalConfiguration',
    title: 'Informations générales',
    type: 'document',
    fields: [
        defineField({
            name: 'opening_date',
            title: "Date d'ouverture",
            type: 'date',
            validation: (v) => v.required(),
        }),

        defineField({
            name: 'arancini_available',
            title: "Vente d'arancini",
            type: 'boolean',
            initialValue: true
        }),
    ],
})