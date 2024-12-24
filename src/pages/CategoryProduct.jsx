import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CategoryProduct() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [total, setTotal] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(`https://e-commerce-website-live-back-end.vercel.app/api/v1/product/product-category/${params.slug}`);
      console.log(data?.products);
      console.log(data?.category);

      setProducts(data?.products);
      setCategory(data?.category);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductCat();
  }, [params?.slug]);
  const getProductCat = async () => {
    const { data } = await axios.get(`https://e-commerce-website-live-back-end.vercel.app/api/v1/product/product-category/${params.slug}`);
    console.log(data?.products);

    setProducts(data?.products);
    setCategory(data?.category);
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center mt-5 pt-5">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>

        <div className="row">
          <div className="col-md-4 ">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-5" key={p._id}>
                  <img style={{minWidth:"300px"}}
                    src={`https://e-commerce-website-live-back-end.vercel.app/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CategoryProduct;
