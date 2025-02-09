import {useEffect, useMemo, useState} from 'react'
import {useClient} from 'sanity'
import html2pdf from 'html2pdf.js'

import {Opening, Order as OrderT} from '../types'

import './styles.css'

function Order({order_items, order_name, order_time}: OrderT) {
  const total = order_items?.reduce((acc, item) => acc + item.order_item_reference?.price || 0, 0)

  return (
    <div className="order-card">
      <div className="order-header">
        <h3>
          {order_time} - {order_name}
        </h3>
        <p className="order-info">
          Pizza : {order_items?.length || 0} | Total : <b>{total || '0'} €</b>
        </p>
      </div>

      <div className="order-items">
        {order_items?.map((item, index) => (
          <div key={index} className="order-item">
            <b>
              {item.order_item_reference?.price} € - {item.order_item_reference?.name}
              {!!item.order_item_comment && (
                <span>
                  &nbsp; - &nbsp;
                  <i className="order-comment">{item.order_item_comment}</i>
                </span>
              )}
            </b>
          </div>
        ))}
      </div>
    </div>
  )
}

function OpeningDetails({documentId}: {documentId: string}) {
  const [opening, setOpening] = useState<Partial<Opening> | null>(null)
  const client = useClient({apiVersion: '2021-06-07'})

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
    if (!opening && documentId) fetchOpening()
  }, [documentId, opening, client])

  const orders = useMemo(() => {
    if (opening?.orders) {
      return opening.orders.sort((a, b) => a.order_time.localeCompare(b.order_time))
    }
    return []
  }, [opening])

  const summary = useMemo(() => {
    let pizzaCount = 0
    let moneyCount = 0
    orders.forEach((order) => {
      pizzaCount += order.order_items?.length || 0
      order.order_items?.forEach((item) => {
        moneyCount += item.order_item_reference.price
      })
    })
    return {pizzaCount, moneyCount}
  }, [orders])

  const openingDateTitle =
    opening?.date &&
    `Ouveture du ${Intl.DateTimeFormat('fr', {day: 'numeric', weekday: 'short', month: 'short', year: '2-digit'}).format(new Date(opening.date))}`

  const handlePrint = () => {
    const element = document.getElementById('printable')
    html2pdf()
      .set({
        margin: 8,
        filename: openingDateTitle,
        image: {type: 'png', quality: 1},
        html2canvas: {scale: 1.5},
      })
      .from(element)
      .save()
  }

  return (
    <>
      <h2>{`${openingDateTitle} - Total : ${summary.moneyCount}€`}</h2>
      <button onClick={handlePrint}>Imprimer</button>
      <hr />
      <div id="printable">
        <h3>Pâtons : {summary.pizzaCount}</h3>
        <div className="orders">
          {orders.map((order, index) =>
            order.order_time ? <Order key={index} {...order} /> : null,
          )}
        </div>
      </div>
    </>
  )
}

export default OpeningDetails
