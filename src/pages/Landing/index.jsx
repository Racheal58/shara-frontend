import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Nav from '../../components/Nav';
// import FadeOut from '../../components/Loader/FadeOut';
import Footer from '../../components/Footer';

// styles
import './index.scss';

// actions
import {
  getProducts,
  addProductToOrder,
  getUserOrder,
} from '../../store/modules/products';

const Landing = props => {
  React.useEffect(() => {
    const fetchProducts = async () => {
      await props.getProducts();
    };

    fetchProducts();
  }, []);

  const landingProduct = [];
  props.products.forEach((elem, index) => {
    if (index > 4) return;
    landingProduct.push(elem);
  });

  return (
    <section className="products">
      <Nav />
      <section className="products-container">
        <div className="card-container">
          {landingProduct.length > 0 && (
            <>
              {landingProduct.map(product => (
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
                </div>
              ))}
              <div className="card">
                <div className="card-body p-0">
                  <Link
                    to="/products"
                    className="h-100 d-flex justify-content-center align-items-center flex-column text-decoration-none"
                  >
                    <i className="fas fa-plus fa-10x text-custom"></i>
                    <p className="text-custom">See more</p>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </section>
  );
};

const mapStateToProps = ({ product: { products, order, isLoading } }) => ({
  products,
  order,
  isLoading,
});

export default connect(mapStateToProps, {
  getProducts,
  addProductToOrder,
  getUserOrder,
})(Landing);
