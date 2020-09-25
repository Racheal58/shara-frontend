import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Nav from '../../components/Nav';
import FadeOut from '../../components/Loader/FadeOut';

// styles
import './index.scss';

// actions
import {
  getProducts,
  addProductToOrder,
  getUserOrder,
} from '../../store/modules/products';

const Products = props => {
  const [quantity, setQuantity] = React.useState(1);
  const [item, setItem] = React.useState({});

  React.useEffect(() => {
    const fetchProducts = async () => {
      props.getProducts();
    };

    const fetchUserOrder = async () => {
      await props.getUserOrder();
    };

    fetchProducts();
    fetchUserOrder();
  }, [props.order]);

  const addProductToCart = async (e, newProduct) => {
    e.preventDefault();
    await props.addProductToOrder({
      ...newProduct,
      quantity: quantity,
    });
    setQuantity(1);
  };

  return (
    <section className="products">
      <Nav />
      <section className="products-container">
        <div className="d-flex justify-content-end mb-3 cart-div">
          <Link to="/order" className="btn btn-transparent px-0 cart-btn">
            <i className="fas fa-box-open text-custom fa-3x" />
            <p className="cart-length">{props.cartLength}</p>
          </Link>
        </div>
        <div className="card-container">
          {props.products.length > 0 &&
            props.products.map(product => (
              <div className="card" key={product._id}>
                <div className="card-image-container">
                  <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text price">
                    &#8358;{parseInt(product.price).toLocaleString()}
                  </p>
                </div>
                <div className="card-footer bg-transparent d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-custom w-100"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => setItem(product)}
                  >
                    <i className="fas fa-cart-plus text-white fa-lg" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
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
              <form onSubmit={e => addProductToCart(e, item)}>
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
                      setQuantity(e.target.value);
                    }}
                    required
                    value={quantity}
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
                  >
                    {props.isLoading ? <FadeOut /> : 'Add to Cart'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({
  product: { products, order, isLoading, cartLength },
}) => ({
  products,
  order,
  isLoading,
  cartLength,
});

export default connect(mapStateToProps, {
  getProducts,
  addProductToOrder,
  getUserOrder,
})(Products);
