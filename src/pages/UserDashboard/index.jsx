import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// components
import Nav from '../../components/Nav';

// actions
import { getOrders } from '../../store/modules/orders';

import { logout } from '../../api/helpers';

// styles
import './index.scss';

const UserDashboard = props => {
  React.useEffect(() => {
    const fetchOrders = async () => {
      await props.getOrders();
    };
    fetchOrders();
  }, []);

  return (
    <section className="admin-dashboard">
      <div>
        <Nav />
      </div>

      <main className="d-flex justify-content-center">
        <div className="row w-100">
          <div className="col-2 px-0 sidebar">
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
                Orders
              </a>

              <a
                className="nav-link logout"
                id="v-pills-messages-tab"
                data-toggle="pill"
                href="#"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                <button
                  type="button"
                  className="btn btn-transparent w-100"
                  onClick={() => logout()}
                >
                  <i className="fas fa-sign-out-alt mr-3" />
                  Logout
                </button>
              </a>
            </div>
          </div>
          <div className="col-10 px-0 main-content">
            <div className="tab-content" id="v-pills-tabContent">
              <div
                className="tab-pane active"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Order Id</th>
                      <th scope="col">User Id</th>
                      <th scope="col">Products Count</th>
                      <th scope="col">Completed</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Updated At</th>
                      <th scope="col">More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.orders.length > 0 &&
                      props.orders.map((order, index) => (
                        <tr key={order._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{order._id}</td>
                          <td>{order.userId}</td>
                          <td>{order.products.length}</td>
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

const matchStateToProps = ({ order: { orders } }) => ({
  orders,
});

export default connect(matchStateToProps, {
  getOrders,
})(UserDashboard);
