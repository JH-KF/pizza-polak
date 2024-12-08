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
    ],
})