import React, { Component } from "react";
import { connect } from "react-redux";
import { createProduct } from "../slices/products";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeSku = this.onChangeSku.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      sku: "",
      name: "",
      price: 0,
      brand: "",
      submitted: false,
    };
  }

  onChangeSku(e) {
    this.setState({
      sku: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeBrand(e) {
    this.setState({
      brand: e.target.value,
    });
  }

  saveProduct() {
    const { sku, name, price, brand } = this.state;

    this.props
      .createProduct({ sku, name, price, brand })
      .unwrap()
      .then((data) => {
        this.setState({
            sku: data.sku,
            name: data.name,
            price: data.price,
            brand: brand,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
        sku: "",
        name: "",
        price: 0,
        brand: "",
        submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="sku">SKU</label>
              <input
                type="text"
                className="form-control"
                id="sku"
                required
                value={this.state.sku}
                onChange={this.onChangeSku}
                name="sku"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Brand</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                required
                value={this.state.brand}
                onChange={this.onChangeBrand}
                name="brand"
              />
            </div>

            <button onClick={this.saveProduct} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createProduct })(AddProduct);