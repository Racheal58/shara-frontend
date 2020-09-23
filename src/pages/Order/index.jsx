import React from 'react';
import { connect } from 'react-redux';

// components
import Nav from '../../components/Nav';
import FadeOut from '../../components/Loader/FadeOut';

// actions
import {
  getUserOrder,
  completeUserOrder,
  removeProductFromOrder,
  editProductQuantity,
} from '../../store/modules/products';

// styles
import './index.scss';

const Order = ({
  userOrder,
  getUserOrder: getUserOrderFunction,
  completeUserOrder: completeUserOrderFunction,
  removeProductFromOrder: removeProductFromOrderFunction,
  editProductQuantity: editProductQuantityFunction,
  history,
  isLoading,
}) => {
  const [editItemQuantity, setEditItemQuantity] = React.useState(0);
  const [editItemId, setEditItemId] = React.useState(0);
  React.useEffect(() => {
    const fetchUserOrder = async () => {
      await getUserOrderFunction();
    };

    fetchUserOrder();
  }, []);

  const handleQuantityChange = (itemQuantity, productId) => {
    setEditItemQuantity(itemQuantity);
    setEditItemId(productId);
  };

  const handleCompleteUserOrderFunction = async () => {
    await completeUserOrderFunction(userOrder._id);
    history.redirect('/dashboard');
  };

  return (
    <section className="orders">
      <Nav />
      <div className="order-container">
        <p>Your order</p>

        <table className="table table-striped table-hover hide-table-sm">
          <thead>
            <tr className="border">
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Quantity</th>
              <th scope="col">Rate (&#8358;)</th>
              <th scope="col">Price (&#8358;)</th>
              <th scope="col">More</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(userOrder).length > 0 &&
              userOrder.products.map((item, index) => (
                <tr key={item._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      src={item.imageUrl}
                      alt={item.imageUrl}
                      className="table-image-thumbnail"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td className="text-right">
                    {Number(item.quantity)}
                    <button
                      type="button"
                      className="btn btn-custom w-100"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() =>
                        handleQuantityChange(item.quantity, item._id)
                      }
                    >
                      <i className="fas fa-pen" />
                    </button>
                  </td>
                  <td className="text-right">
                    {parseInt(item.price).toLocaleString()}
                  </td>
                  <td className="text-right">
                    {Number(item.price.toLocaleString()) *
                      Number(item.quantity)}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-transparent w-100"
                      onClick={() =>
                        removeProductFromOrderFunction(userOrder._id, item._id)
                      }
                    >
                      <i className="fas fa-times text-danger fa-lg" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="card-container hide-lg">
          {Object.keys(userOrder).length > 0 &&
            userOrder.products.map(item => (
              <div className="card product-card" key={item._id}>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex pb-3">
                    <div className="product-card-img-container">
                      <img
                        src={item.imageUrl}
                        className="product-card-img"
                        alt="..."
                      />
                    </div>
                    <div className="details-container">
                      <p className="card-text">{item.name}</p>
                      <p className="card-text price">
                        &#8358;
                        {parseInt(item.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="card-footer p-0 d-flex justify-content-between align-items-center bg-transparent">
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() =>
                        handleQuantityChange(item.quantity, item._id)
                      }
                      className="btn btn-transparent rounded-circle d-flex justify-content-center align-items-center p-0 edit"
                    >
                      <i className="fas fa-edit text-custom" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        removeProductFromOrderFunction(userOrder._id, item._id)
                      }
                      className="btn btn-danger rounded-circle d-flex justify-content-center align-items-center p-0 delete"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Quantity
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      How many do you want to buy ?
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={e => {
                        setEditItemQuantity(e.target.value);
                      }}
                      required
                      value={Number(editItemQuantity)}
                    />
                  </div>
                  <div className="modal-footer d-flex justify-content-between border-top-0 p-0">
                    <button
                      type="button"
                      className="btn btn-secondary btn-fit-content"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-custom btn-fit-content"
                      onClick={e => {
                        e.preventDefault();
                        editProductQuantityFunction(
                          userOrder._id,
                          editItemId,
                          editItemQuantity,
                        );
                      }}
                    >
                      {isLoading ? <FadeOut /> : 'Add to Cart'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <button
          type="button"
          className="btn btn-custom"
          onClick={() => handleCompleteUserOrderFunction()}
        >
          Complete Order
        </button>
      </footer>
    </section>
  );
};

const mapStateToProps = ({ product: { userOrder, isLoading } }) => ({
  userOrder,
  isLoading,
});

export default connect(mapStateToProps, {
  getUserOrder,
  completeUserOrder,
  removeProductFromOrder,
  editProductQuantity,
})(Order);
