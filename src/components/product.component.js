import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProduct, deleteProduct } from "../slices/products";
import ProductDataService from "../services/product.service";
import { withRouter } from '../common/with-router';

class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeSku = this.onChangeSku.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeProduct = this.removeProduct.bind(this);

    this.state = {
      currentProduct: {
        sku: "",
        name: "",
        price: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProduct(this.props.router.params.id);
  }

  onChangeSku(e) {
    const sku = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          sku: sku,
        },
      };
    });
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState((prevState) => ({
        currentProduct: {
        ...prevState.currentProduct,
        name: name,
      },
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState((prevState) => ({
        currentProduct: {
        ...prevState.currentProduct,
        price: price,
      },
    }));
  }

  getProduct(id) {
    ProductDataService.get(id)
      .then((response) => {
        this.setState({
          currentProduct: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateProduct({ id: this.state.currentProduct.id, data: this.state.currentProduct })
      .unwrap()
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The product was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeProduct() {
    this.props
      .deleteProduct({ id: this.state.currentProduct.id })
      .then(() => {
        this.props.router.navigate('/products');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentProduct } = this.state;

    return (
        <div>
          {currentProduct ? (
            <div className="edit-form">
              <h4>Product</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="sku">SKU</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sku"
                    value={currentProduct.sku}
                    onChange={this.onChangeSku}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={currentProduct.name}
                    onChange={this.onChangeName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={currentProduct.price}
                    onChange={this.onChangePrice}
                  />
                </div>
              </form>
  
              <button
                className="badge badge-danger mr-2"
                onClick={this.removeProduct}
              >
                Delete
              </button>
  
              <button
                type="submit"
                className="badge badge-success"
                onClick={this.updateContent}
              >
                Update
              </button>
              <p>{this.state.message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Product...</p>
            </div>
          )}
        </div>
      );
  }
}

export default connect(null, { updateProduct, deleteProduct })(withRouter(Product));