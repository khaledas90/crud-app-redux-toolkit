import React, { Fragment } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../redux/productSlice";

export default function Product() {
  const [Name, SetName] = useState("");
  const [Category, SetCategory] = useState("");
  const [Price, SetPrice] = useState("");
  const [UpdateName, SetUpdateName] = useState("");
  const [UpdateCategory, SetUpdateCategory] = useState("");
  const [UpdatePrice, SetUpdatePrice] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);

  const Products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  const AddProduct = () => {
    dispatch(
      addProduct({
        id: Products.length + 1,
        Name: Name,
        Category: Category,
        Price: Price,
      })
    );
    SetName("");
    SetCategory("");
    SetPrice("");
  };

  const removeProduct = (id) => {
    dispatch(deleteProduct({ id }));
  };

  const updateProductHandle = (id) => {
    dispatch(
      updateProduct({
        id: id,
        Name: UpdateName,
        Category: UpdateCategory,
        Price: UpdatePrice,
      })
    );
    setIsEdit(false);
    setId(null);
  };

  return (
    <Fragment>
      <div className="product">
        <div className="container">
          <h2>CRUD APP Using Redux Toolkit</h2>
          <h4>Add Your Product Name, Price and Category</h4>
          <div className="content">
            <form>
              <input
                type="text"
                placeholder="Product Name"
                id="fname"
                value={Name}
                onChange={(e) => SetName(e.target.value)}
                name="fname"
              />
              <input
                type="text"
                placeholder="Product Category"
                id="fname"
                value={Category}
                onChange={(e) => SetCategory(e.target.value)}
                name="fname"
              />
              <input
                type="number"
                placeholder="Product Price"
                id="fname"
                value={Price}
                onChange={(e) => SetPrice(e.target.value)}
                name="fname"
              />
              <input type="button" onClick={AddProduct} value="Add Product" />
            </form>
          </div>
          <div className="all-product">
            <table id="product-menu">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {Products.length > 0 ? (
                  Products.map((product) => (
                    <tr key={product.id}>
                      {isEdit && id === product.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              value={UpdateName}
                              onChange={(e) => SetUpdateName(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={UpdateCategory}
                              onChange={(e) =>
                                SetUpdateCategory(e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={UpdatePrice}
                              onChange={(e) => SetUpdatePrice(e.target.value)}
                            />
                          </td>
                          <td colSpan="2">
                            <button
                              type="button"
                              className="btn btn-update"
                              onClick={() => updateProductHandle(product.id)}
                            >
                              Update
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{product.Name}</td>
                          <td>{product.Category}</td>
                          <td>{product.Price}</td>
                          <td>
                            <button
                              onClick={() => {
                                setIsEdit(true);
                                setId(product.id);
                                SetUpdateName(product.Name);
                                SetUpdateCategory(product.Category);
                                SetUpdatePrice(product.Price);
                              }}
                              type="button"
                              className="btn btn-edit"
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => removeProduct(product.id)}
                              type="button"
                              className="btn btn-remove"
                            >
                              Remove
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">There are no products added</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
