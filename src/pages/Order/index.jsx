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
    history.redirect('/dashbpard');
  };

  return (
    <section className="orders">
      <Nav />
      <div className="order-container">
        <p>Your order</p>

        <table className="table table-striped table-hover">
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
                <>
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
                    <td className="text-right">{item.price}</td>
                    <td className="text-right">
                      {Number(item.price) * Number(item.quantity)}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-transparent w-100"
                        onClick={() =>
                          removeProductFromOrderFunction(
                            userOrder._id,
                            item._id,
                          )
                        }
                      >
                        <i className="fas fa-times text-danger fa-lg" />
                      </button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>

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
                <form
                // onSubmit={e => addProductToCart(e, item)}
                >
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
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-custom"
                      onClick={e => {
                        e.preventDefault();
                        editProductQuantityFunction(
                          userOrder._id,
                          editItemId,
                          editItemQuantity,
                        );
                      }}
                    >
                      {/* {props.isLoading ? <FadeOut /> : 'Add to Cart'} */}
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
          Completed Order
        </button>
      </footer>
    </section>
  );
};

const mapStateToProps = ({ product: { userOrder } }) => ({
  userOrder,
});

export default connect(mapStateToProps, {
  getUserOrder,
  completeUserOrder,
  removeProductFromOrder,
  editProductQuantity,
})(Order);
