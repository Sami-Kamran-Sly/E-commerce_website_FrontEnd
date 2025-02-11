import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // To get the product ID from URL

function ProjectsDetail() {
  const [product, setProduct] = useState({});
  const [productRelated, setRelatedProducts] = useState([]);


 const params = useParams()
 const navigate = useNavigate()



 const getSimilarProduct = async(pid,cid)=>{



  try {
    
    
  const { data } = await axios.get(`https://e-commerce-website-live-back-end.vercel.app/api/v1/product/related-product/${pid}/${cid}`);


  setRelatedProducts(data.products)

  } catch (error) {
    
    console.log(error)
  }

  
 }

const getSingleProduct =async ()=>{





    try {
        

        const { data } = await axios.get(`https://e-commerce-website-live-back-end.vercel.app/api/v1/product/getsingle-product/${params.slug}`);
        setProduct(data?.product); // Assume the API returns a single product object
        getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
        console.error("Error fetching product:", error);
    }

}
useEffect(()=>{
    if(params?.slug) getSingleProduct()
},[params?.slug])
  return (
    <Layout>
      <div className="row container">
        <div className="col-md-6 mt-5">
          <img
            src={`https://e-commerce-website-live-back-end.vercel.app/api/v1/product/product-photo/${product._id}`}
            className="card-img-top mt-3"
            alt={product.name}
            height={"500px"}
            width={"500px"}
          />
        </div>

        <div className="col-md-6 mt-3 product-details-info">
          <h1 className="text-center mt-5">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => addToCart(product)}
          >
            ADD TO CART
          </button>
        
        </div>


      



<div className='mt-5 '>
  <h1>Similar Products</h1>

      <div className="d-flex flex-wrap mt-5">

          {productRelated?.map((p) => (
            <div className="card w-50 m-2" key={p._id}>
              <img
                src={p._id ? `https://e-commerce-website-live-back-end.vercel.app/api/v1/product/product-photo/${p._id}` : ""}
                className="card-img-top"
                alt={p.name}
              />

              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price"></h5>
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
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
        </div>
    </Layout>
  );
}

export default ProjectsDetail;
