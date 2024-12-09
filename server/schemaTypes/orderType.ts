import {defineField, defineType} from 'sanity'

export const orderType = defineType({
    name: 'order',
    title: 'Commande',
    type: 'document',
    fields: [
        defineField({
            name: 'order_name',
            title: 'Nom de la commande',
            type: 'string',
            validation: (v) => v.required()
        }),
        defineField({
            name: 'order_time',
            title: 'Heure de commande',
            type: 'string',
            options: {
                list: [
                    "17:00", "17:15", "17:30", "17:45",
                    "18:00", "18:15", "18:30", "18:45",
                    "19:00", "19:15", "19:30", "19:45",
                    "20:00", "20:15", "20:30", "20:45",
                    "21:00", "21:15", "21:30", "21:45",
                    "22:00"
                ]     
            },
            validation: (v) => v.required()
        }),
        defineField({
            name: 'order_items',
            title: 'Liste des pizza',
            type: 'array',
            of: [{type: 'orderItem'}],
        }),
    ],
    preview: {
        select: {
            orderName: 'order_name',
            orderTime: 'order_time',
            orderItems: 'order_items',
        },
        prepare(selection) {
            const { orderName, orderItems, orderTime } = selection;
            return {
                title: `${orderName}`,
                subtitle: `${orderTime} - Pizza : ${orderItems?.length || 0}`,
                media: ''
            };
        },
    },
})