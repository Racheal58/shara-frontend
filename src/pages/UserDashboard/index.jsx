import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';

// components
import Nav from '../../components/Nav';

// actions
import { getUserOrders } from '../../store/modules/orders';

import { logout } from '../../api/helpers';

// styles
import './index.scss';

const UserDashboard = props => {
  React.useEffect(() => {
    const fetchOrders = async () => {
      await props.getUserOrders();
    };

    fetchOrders();
  }, []);

  const handleTotalPrice = products =>
    products.reduce((a, b) => a + Number(b.price * b.quantity), 0);

  return (
    <section className="user-dashboard">
      <div>
        <Nav />
      </div>

      <main className="d-flex justify-content-center">
        <div className="row w-100">
          <div className="col-12 col-lg-2 px-0 sidebar">
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                className="nav-link active"
                id="v-pills-profile-tab"
                data-toggle="pill"
                href="#v-pills-profile"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                <i className="fas fa-shopping-cart mr-3" />
                <span>Orders</span>
              </a>

              <a
                className="nav-link logout"
                id="v-pills-messages-tab"
                data-toggle="pill"
                href="#"
                role="button"
                aria-controls="button"
                aria-selected="false"
                onClick={() => logout()}
              >
                <i className="fas fa-sign-out-alt mr-3" />
                Logout
              </a>
            </div>
          </div>
          <div className="col-12 col-lg-10 px-0 main-content">
            <div className="tab-content" id="v-pills-tabContent">
              <div
                className="tab-pane active"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <table className="table table-striped table-bordered table-hover hide-table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Order Id</th>
                      <th scope="col">No of Items</th>
                      <th scope="col">Total Price</th>
                      <th scope="col">Completed</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Updated At</th>
                      <th scope="col">More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.userOrders.length > 0 &&
                      props.userOrders.map((order, index) => (
                        <tr key={order._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{order._id}</td>
                          <td>{order.products.length}</td>
                          <td>
                            &#8358;
                            {parseInt(
                              handleTotalPrice(order.products),
                            ).toLocaleString()}
                          </td>
                          <td>{order.isCompleted.toString()}</td>
                          <td>
                            {moment(order.created_at).format('DD MMM YYYY')}
                          </td>
                          <td>
                            {moment(order.updated_at).format('DD MMM YYYY')}
                          </td>
                          <td>...</td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className="card-container hide-lg">
                  {props.userOrders.length > 0 &&
                    props.userOrders.map(order => (
                      <div className="card order-card" key={order._id}>
                        <div className="card-body">
                          {order.isCompleted ? (
                            <i
                              className="fas fa-check-circle text-success completed_status"
                              style={{ fontSize: 20 }}
                            />
                          ) : (
                            <i
                              className="fas fa-circle-notch text-warning completed_status"
                              style={{ fontSize: 20 }}
                            />
                          )}
                          <p className="card-text">
                            Order ID:{' '}
                            <span className="result id">{order._id}</span>
                          </p>
                          <p className="card-text">
                            Order Date:{' '}
                            <span className="result date">
                              {moment(order.created_at).format(
                                'ddd, DD MMM YYYY',
                              )}
                            </span>
                          </p>
                          <p className="card-text">
                            No of Items:{' '}
                            <span className="result items">
                              {order.products.length}
                            </span>
                          </p>
                          <p className="card-text">
                            Total Price:{' '}
                            <span className="result price">
                              &#8358;
                              {parseInt(
                                handleTotalPrice(order.products),
                              ).toLocaleString()}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

const matchStateToProps = ({ order: { userOrders } }) => ({
  userOrders,
});

export default connect(matchStateToProps, {
  getUserOrders,
})(UserDashboard);
