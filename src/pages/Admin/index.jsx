import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';

// components
import Nav from '../../components/Nav';
import FadeOut from '../../components/Loader/FadeOut';

// actions
import {
  createProducts,
  getProducts,
  deleteProduct,
  editProduct,
} from '../../store/modules/products';
import { getUsers } from '../../store/modules/users';
import { getOrders } from '../../store/modules/orders';

import { logout } from '../../api/helpers';

// styles
import './index.scss';

const createProductModal = (
  imageObj,
  isLoading,
  imageUploadLoading,
  handleImageUpload,
  onSubmit,
  setName,
  setDescription,
  setPrice,
  name,
  description,
  price,
  disabled,
) => (
  <div
    className="modal fade"
    id="createProductModal"
    tabIndex="-1"
    aria-labelledby="createProductModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="createProductModalLabel">
            Create New Product
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
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group d-flex justify-content-center">
              <label
                htmlFor="image"
                className="btn widget-upload-btn d-flex justify-content-center align-items-center"
              >
                <div className="screen justify-content-center align-items-center">
                  <i className="fas fa-plus mr-2 text-white" /> Add
                </div>
                {Object.keys(imageObj).length > 0 ? (
                  <img
                    src={imageObj.imageUrl}
                    alt={imageObj.imageAlt}
                    className="image-thumbnail"
                  />
                ) : (
                  <>
                    {imageUploadLoading ? (
                      <FadeOut />
                    ) : (
                      <i className="far fa-image fa-5x" />
                    )}
                  </>
                )}
              </label>
              <input
                type="file"
                name="image"
                id="image"
                hidden
                required
                onChange={e => handleImageUpload(e)}
                disabled={disabled}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="nameHelp"
                onChange={e => {
                  setName(e.target.value);
                }}
                required
                value={name}
                disabled={disabled}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                aria-describedby="descriptionHelp"
                onChange={e => {
                  setDescription(e.target.value);
                }}
                required
                value={description}
                disabled={disabled}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                aria-describedby="priceHelp"
                onChange={e => {
                  setPrice(e.target.value);
                }}
                required
                value={price}
                disabled={disabled}
              />
            </div>
            <div className="modal-footer d-flex justify-content-between border-top-0 p-0">
              <button
                type="button"
                className="btn btn-secondary btn-fit-content"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-custom  btn-fit-content">
                {isLoading ? <FadeOut /> : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const editProductModal = (
  imageObj,
  isLoading,
  imageUploadLoading,
  handleImageUpload,
  editProductFunction,
  setEditProductName,
  setEditProductDescription,
  setEditProductPrice,
  editProductName,
  editProductDescription,
  editProductPrice,
  editProductImageUrl,
  disabled,
) => (
  <div
    className="modal fade"
    id="editProductModal"
    tabIndex="-1"
    aria-labelledby="editProductModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="editProductModalLabel">
            Modal title
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
          <form onSubmit={e => editProductFunction(e)}>
            <div className="form-group d-flex justify-content-center">
              <label
                htmlFor="image"
                className="btn widget-upload-btn d-flex justify-content-center align-items-center"
              >
                <div className="screen justify-content-center align-items-center">
                  <i className="fas fa-plus mr-2 text-white" /> Add
                </div>
                {Object.keys(imageObj).length > 0 ? (
                  <img
                    src={imageObj.imageUrl}
                    alt={imageObj.imageAlt}
                    className="image-thumbnail"
                  />
                ) : (
                  <>
                    {imageUploadLoading ? (
                      <FadeOut />
                    ) : (
                      <img
                        src={editProductImageUrl}
                        alt={editProductImageUrl}
                        className="image-thumbnail"
                      />
                    )}
                  </>
                )}
              </label>
              <input
                type="file"
                name="image"
                id="image"
                hidden
                onChange={e => handleImageUpload(e)}
                disabled={disabled}
                value=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="nameHelp"
                onChange={e => {
                  setEditProductName(e.target.value);
                }}
                required
                value={editProductName}
                disabled={disabled}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                aria-describedby="descriptionHelp"
                onChange={e => {
                  setEditProductDescription(e.target.value);
                }}
                required
                value={editProductDescription}
                disabled={disabled}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                aria-describedby="priceHelp"
                onChange={e => {
                  setEditProductPrice(e.target.value);
                }}
                required
                value={editProductPrice}
                disabled={disabled}
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
              <button type="submit" className="btn btn-custom btn-fit-content">
                {isLoading ? <FadeOut /> : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const Admin = props => {
  const { isLoading } = props;

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');

  const [editProductName, setEditProductName] = React.useState('');
  const [editProductDescription, setEditProductDescription] = React.useState(
    '',
  );
  const [editProductPrice, setEditProductPrice] = React.useState('');
  const [editProductImageUrl, setEditProductImageUrl] = React.useState('');
  const [editProductId, setEditProductId] = React.useState('');
  const [imageObj, setImageObj] = React.useState({});
  const [imageUploadLoading, setImageUploadLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    const fetchProducts = async () => {
      await props.getProducts();
    };

    const fetchUsers = async () => {
      await props.getUsers();
    };

    const fetchOrders = async () => {
      await props.getOrders();
    };

    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();

    await props.createProducts(
      { name, description, price, imageUrl: imageObj.imageUrl },
      props.products,
    );
  };

  const deleteProductFunction = async productId => {
    await props.deleteProduct(productId, props.products);
  };

  const editProductFunction = async e => {
    e.preventDefault();
    await setDisabled(true);
    await props.editProduct(
      editProductId,
      {
        name: editProductName,
        description: editProductDescription,
        price: editProductPrice,
        imageUrl:
          Object.keys(imageObj).length > 0
            ? imageObj.imageUrl
            : editProductImageUrl,
      },
      props.products,
    );
    await setDisabled(false);
  };

  const handleImageUpload = () => {
    setImageUploadLoading(true);
    const { files } = document.querySelector('input[type="file"]');

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('cloudName', 'racheal');
    formData.append('upload_preset', 'fygizpes');
    formData.append('folder', 'Shara Shoes');

    const options = {
      method: 'POST',
      body: formData,
    };

    return fetch(
      'https://api.cloudinary.com/v1_1/racheal/image/upload',
      options,
    )
      .then(res => res.json())
      .then(({ secure_url, original_filename }) => {
        setImageUploadLoading(false);
        setImageObj({
          imageUrl: secure_url,
          imageAlt: `An image of ${original_filename}`,
        });
      })
      .catch(() =>
        toast.error(
          'Image upload failed, please refresh the page and try again',
        ),
      );
  };

  const handleTotalPrice = products =>
    products.reduce((a, b) => a + Number(b.price * b.quantity), 0);

  return (
    <section className="admin-dashboard">
      <div>
        <Nav />
      </div>

      <main className="d-flex justify-content-center">
        <div className="row w-100 px-0">
          <div className="col-12 col-lg-2 px-0 sidebar">
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                className="nav-link active"
                id="v-pills-home-tab"
                data-toggle="pill"
                href="#v-pills-home"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                <i className="fas fa-box-open mr-0 mr-lg-3" />
                <span>Products</span>
              </a>
              <a
                className="nav-link"
                id="v-pills-profile-tab"
                data-toggle="pill"
                href="#v-pills-profile"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                <i className="fas fa-shopping-cart mr-0 mr-lg-3" />
                <span>Orders</span>
              </a>
              <a
                className="nav-link"
                id="v-pills-messages-tab"
                data-toggle="pill"
                href="#v-pills-messages"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                <i className="fas fa-users mr-0 mr-lg-3" />
                <span>Users</span>
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
          <div className="col-12 col-lg-2 px-0 main-content">
            <div className="tab-content" id="v-pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <div>
                  <div className="mb-3 text-right text-lg-left btn-div">
                    <button
                      type="button"
                      className="btn btn-custom"
                      data-toggle="modal"
                      data-target="#createProductModal"
                    >
                      Create New Product
                    </button>
                  </div>
                  <div className="card-deck">
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
                            <p className="card-text">
                              Price: &#8358;
                              {parseInt(product.price).toLocaleString()}
                            </p>
                          </div>
                          <div className="card-footer bg-transparent d-flex justify-content-between">
                            <button
                              type="button"
                              className="btn btn-transparent"
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={() => deleteProductFunction(product._id)}
                            >
                              <i className="fas fa-trash text-danger fa-lg" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-transparent"
                              data-toggle="modal"
                              data-target="#editProductModal"
                              onClick={() => {
                                setEditProductName(product.name);
                                setEditProductDescription(product.description);
                                setEditProductPrice(product.price);
                                setEditProductImageUrl(product.imageUrl);
                                setEditProductId(product._id);
                              }}
                            >
                              <i className="far fa-edit text-custom fa-lg" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <table className="table table-striped table-bordered table-hover hide-table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Order Id</th>
                      <th scope="col">User Id</th>
                      <th scope="col">No of Items</th>
                      <th scope="col">Total Price</th>
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
                  {props.orders.length > 0 &&
                    props.orders.map(order => (
                      <div className="card order-card" key={order._id}>
                        <div className="card-body">
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
              <div
                className="tab-pane fade"
                id="v-pills-messages"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
              >
                <table className="table table-striped table-bordered table-hover  hide-table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">isAdmin</th>
                      <th scope="col">More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.users.length > 0 &&
                      props.users.map((user, index) => (
                        <tr key={user._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone_number}</td>
                          <td>{user.isAdmin}</td>
                          <td>...</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="card-container hide-lg">
                  {props.users.length > 0 &&
                    props.users.map(user => (
                      <div className="card order-card" key={user._id}>
                        <div className="card-body">
                          <p className="card-text">
                            Full Name:{' '}
                            <span className="result id">
                              {user.first_name} {user.last_name}
                            </span>
                          </p>
                          <p className="card-text">
                            Email:{' '}
                            <span className="result date">{user.email}</span>
                          </p>
                          <p className="card-text">
                            Phone Number:{' '}
                            <span className="result items">
                              {user.phone_number}
                            </span>
                          </p>
                          <p className="card-text">
                            Total Price:{' '}
                            {user.isAdmin ? (
                              <span className="result price">
                                {user.isAdmin}
                              </span>
                            ) : (
                              <span className="result text-danger">
                                {user.isAdmin}
                              </span>
                            )}
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

      {createProductModal(
        imageObj,
        isLoading,
        imageUploadLoading,
        handleImageUpload,
        onSubmit,
        setName,
        setDescription,
        setPrice,
        name,
        description,
        price,
        disabled,
      )}
      {editProductModal(
        imageObj,
        isLoading,
        imageUploadLoading,
        handleImageUpload,
        editProductFunction,
        setEditProductName,
        setEditProductDescription,
        setEditProductPrice,
        editProductName,
        editProductDescription,
        editProductPrice,
        editProductImageUrl,
        disabled,
      )}
    </section>
  );
};

const matchStateToProps = ({
  product: { products, isLoading },
  user: { users },
  order: { orders },
}) => ({
  products,
  isLoading,
  users,
  orders,
});

export default connect(matchStateToProps, {
  createProducts,
  getProducts,
  deleteProduct,
  editProduct,
  getUsers,
  getOrders,
})(Admin);
