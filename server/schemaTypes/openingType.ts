import {defineField, defineType} from 'sanity'
import { Order } from '../types';


function getTotalPizza(orders: Order[] | undefined = []) {
    return orders.reduce((total, current) => {
        return total + (current.order_items?.length || 0);
    }, 0)
}

export const openingType = defineType({
    name: 'opening',
    title: 'Ouverture',
    type: 'document',
    fields: [
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
            validation: (v) => v.required()
        }),
        defineField({
            name: 'orders',
            title: 'Commandes',
            type: 'array',
            of: [{type: 'order'}]
        }),
    ],
    preview: {
        select: {
            date: 'date',
            orders: 'orders',
        },
        prepare(selection) {
            const { date, orders } = selection;
            const formattedDate = date && `Ouveture du ${Intl.DateTimeFormat("fr", {"day": "numeric", weekday: "short", month: "short", year: "2-digit"}).format(new Date(date))}`
            return {
                title: `${formattedDate}`,
                subtitle: `Commandes : ${orders?.length || 0} - Pizza : ${getTotalPizza(orders)}`, 
                media: ''
            };
        },
    },
})