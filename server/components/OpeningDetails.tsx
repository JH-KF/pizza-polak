import { useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";
import html2pdf from 'html2pdf.js';

import { Opening, Order as OrderT} from "../types";


function Order({order_items, order_name, order_time} : OrderT) {
  const total = order_items?.reduce((acc, item) => acc + item.order_item_reference?.price || 0, 0);

  return <section>
      <h3>
        {order_time} - {order_name} - pizza : {order_items?.length || 0} - Total : {total || '0'} €
      </h3>
      <div>
        {order_items?.map((item, index) => 
        <div key={index}>
          <b>{item.order_item_reference?.price} € - {item.order_item_reference?.name}</b>
          &nbsp;
          <i>{item.order_item_comment}</i>
        </div>
      )}
      </div>
    </section>
}

function OpeningDetails({documentId} : {documentId: string}) {   
    const [opening, setOpening] = useState<Partial<Opening> | null>(null)
    const client = useClient({apiVersion: '2021-06-07'});

    useEffect(() => {
        async function fetchOpening() {
          const res = await client.fetch(`coalesce(
            *[_id == 'drafts.' + "${documentId}"][0], 
            *[_id == "${documentId}"][0]
          ) {
            date,
            orders[]{
              order_name,
              order_time,
              order_items[]{
                order_item_comment,
                order_item_reference->{
                  name,
                  price
                }
              }
            }
          }`)
          setOpening(res)
        }
        if (!opening && documentId) fetchOpening();
      }, [documentId, opening, client])

      const orders = useMemo(() => {
        if(opening?.orders) {
          return opening.orders.sort((a, b) => a.order_time.localeCompare(b.order_time))
        }
        return [];
      }, [opening])

      const total = useMemo(() => {
        return orders.reduce((acc, order) => (order.order_items || []).reduce((_acc, item) => _acc + item.order_item_reference?.price || 0, 0) + acc, 0);
      }, [orders])

      const openingDateTitle = opening?.date && `Ouveture du ${Intl.DateTimeFormat("fr", {"day": "numeric", weekday: "short", month: "short", year: "2-digit"}).format(new Date(opening.date))}`;

      const handlePrint = () => {
        const element = document.getElementById('printable');
        html2pdf().set({ margin: 4, filename: openingDateTitle, image: { type: 'png', quality: 1 }, html2canvas:  { scale: 2 }}).from(element).save();
      };

      return (
        <>
        <h2>{`${openingDateTitle} - Total : ${total}€`}</h2>
        <button onClick={handlePrint}>Imprimer</button>
        <hr />
        <div id="printable">
          {orders.map((order, index) => (
            order.order_time ? (<>
              <Order key={index} {...order} />
              <hr />
            </>)
            : null
          ))}
        </div>
        </>
      )
}

export default OpeningDetails;