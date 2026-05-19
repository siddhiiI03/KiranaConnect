import { useCallback, useEffect, useMemo, useState } from 'react';

import AppLayout from '../components/AppLayout';

import {

  dispatchOrder,

  getAllOrders,

  getMyOrders,

  updateOrderStatus

} from '../services/api';

import { useAuth } from '../context/useAuth';


const money = (value) =>
  new Intl.NumberFormat(

    'en-IN',

    {

      style: 'currency',

      currency: 'INR',

      maximumFractionDigits: 0

    }

  ).format(value || 0);


const statuses = [

  'pending',

  'confirmed',

  'shipped',

  'delivered',

  'cancelled'

];


export default function OrdersPage() {

  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  const [statusFilter, setStatusFilter] = useState('all');

  const [message, setMessage] = useState('');

  const isWholesaler = user?.role === 'wholesaler';


  const loadOrders = useCallback(async () => {

    try {

      const response = isWholesaler
        ? await getAllOrders()
        : await getMyOrders();

      console.log('Orders API Response:', response.data);

      setOrders(response.data);

    } catch (error) {

      console.log(error);

      setMessage('Failed to load orders.');

    }

  }, [isWholesaler]);


  useEffect(() => {

    loadOrders();

  }, [loadOrders]);


  const filteredOrders = useMemo(() => {

    if (statusFilter === 'all') {
      return orders;
    }

    return orders.filter(
      (order) => order.status === statusFilter
    );

  }, [orders, statusFilter]);


  const totals = {

    all: orders.length,

    pending: orders.filter(
      (order) => order.status === 'pending'
    ).length,

    shipped: orders.filter(
      (order) => order.status === 'shipped'
    ).length,

    delivered: orders.filter(
      (order) => order.status === 'delivered'
    ).length,

  };


  const changeStatus = async (id, status) => {

    await updateOrderStatus(id, status);

    setMessage('Order status updated.');

    loadOrders();

  };


  const markDispatch = async (id) => {

    await dispatchOrder(id);

    setMessage('Order dispatched with ETA.');

    loadOrders();

  };


  return (

    <AppLayout

      title="Orders"

      subtitle="Track order status, fulfilment, delivery ETA, and customer details."

    >

      <section className="kc-command-grid">

        <article className="kc-command-card">

          <span>All Orders</span>

          <strong>{totals.all}</strong>

        </article>

        <article className="kc-command-card">

          <span>Pending</span>

          <strong>{totals.pending}</strong>

        </article>

        <article className="kc-command-card">

          <span>Shipped</span>

          <strong>{totals.shipped}</strong>

        </article>

        <article className="kc-command-card">

          <span>Delivered</span>

          <strong>{totals.delivered}</strong>

        </article>

      </section>


      <section className="kc-form-panel">

        <div className="kc-page-toolbar">

          <h2>
            {isWholesaler
              ? 'Fulfilment Queue'
              : 'My Purchases'}
          </h2>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >

            <option value="all">
              All statuses
            </option>

            {statuses.map((status) => (

              <option
                key={status}
                value={status}
              >

                {status}

              </option>

            ))}

          </select>

        </div>

        {message && (
          <p className="kc-form-status">
            {message}
          </p>
        )}


        <div className="kc-order-grid">

          {filteredOrders.map((order) => (

            <article
              className="kc-order-card"
              key={order._id}
            >

              <div className="kc-order-card-top">

                <div>

                  <strong>
                    {money(order.totalAmount)}
                  </strong>

                  <span>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

                <span
                  className={`kc-status-chip status-${order.status}`}
                >

                  {order.status}

                </span>

              </div>


              <p>

                {isWholesaler

                  ? (

                    order.kirana?.shopName ||

                    order.kirana?.name ||

                    'Kirana buyer'

                  )

                  : (

                    order.wholesaler?.shopName ||

                    order.wholesaler?.name ||

                    'Wholesaler'

                  )}

              </p>


              <div className="kc-order-items">

                {(order.items || []).map((item) => (

                  <span
                    key={
                      item._id ||
                      item.product?._id
                    }
                  >

                    {item.product?.name || 'Product'}

                    {' '}x{' '}

                    {item.quantity}

                  </span>

                ))}

              </div>


              {isWholesaler && (

                <div className="kc-card-actions">

                  <select
                    value={order.status}
                    onChange={(event) =>
                      changeStatus(
                        order._id,
                        event.target.value
                      )
                    }
                  >

                    {statuses.map((status) => (

                      <option
                        key={status}
                        value={status}
                      >

                        {status}

                      </option>

                    ))}

                  </select>


                  <button
                    onClick={() =>
                      markDispatch(order._id)
                    }
                  >

                    Dispatch

                  </button>

                </div>

              )}

            </article>

          ))}


          {!filteredOrders.length && (

            <p className="kc-empty-copy">
              No orders found for this filter.
            </p>

          )}

        </div>

      </section>

    </AppLayout>

  );
}