import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { Checkbox, Radio } from "antd";
import axios from 'axios'
import toast from 'react-hot-toast';
import { Prices } from '../Prices';
import { useCartContext } from '../context/CartContext';

function Home() {
  const {cart,setCart}= useCartContext()

  const [products, setProducts] = useState([]);
  const  [ categories ,setCategory] = useState([])
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);






  const navigate = useNavigate();


  
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`https://e-commerce-website-live-back-end.vercel.app/api/v1/category/getAll-category`);
      if (data) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  useEffect(() => {
    getAllCategory();
    getTotal()
  }, []);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`https://e-commerce-website-live-back-end.vercel.app/api/v1/product/product-list/${page}`);

      if (data?.success) {
        setProducts(data.products);
        toast.success('Products fetched successfully');
      } else {
        toast.error(data?.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Something went wrong');
    }
  };




  const getTotal = async () => {
    try {
      const { data } = await axios.get(`https://e-commerce-website-live-back-end.vercel.app/api/v1/product/product-count`);
      setTotal(data?.total); // Correct line to set total
      console.log(data.total, `Total is ${data.total}`); 
    } catch (error) {
      console.error('Error fetching total count:', error); 
      toast.error('Something went wrong while fetching the total count');
    }
  };
  

  
  useEffect(() => {
    if(page ===1 ) return
    loadMore()
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://e-commerce-website-live-back-end.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };




  
  const filterProducts = async () => {

    console.log("Checked categories:", checked); // Debugging
    console.log("Price range:", radio); // Debugging
    try {
      const { data } = await axios.post(`https://e-commerce-website-live-back-end.vercel.app/api/v1/product/product-filter`, {
        checked,
        radio,

      });
  
      if (data?.success) {
        setProducts(data.products || []);

       
        setTotalPages(data.totalPages);
        setPageNumbers(data.pageNumbers);

      } else {
        toast.error("No products found for the selected filters");
      }
    } catch (error) {
      console.error('Error filtering products:', error);
      toast.error('Something went wrong while filtering');
    }
  };
  

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    }
  }, [checked, radio]);


  const handleFilter = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }

    setChecked(all);
    setRadio([]);
  };






  useEffect(() => {
    getAllProduct();
  }, []);


  const addToCart = (p) => {
    // Find the index of the product in the cart
    const existingProductIndex = cart.findIndex((item) => item._id === p._id);
  
    let updatedCart; // Initialize the variable to store the updated cart
  
    if (existingProductIndex !== -1) {
      // Product already exists in the cart, update the quantity
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      // Product doesn't exist in the cart, add a new entry with quantity 1
      updatedCart = [...cart, { ...p, quantity: 1 }];
    }
  
    // Update the state with the new cart
    setCart(updatedCart);
    
    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    toast.success("Item Added to cart");
  };
  
  return (
    <Layout title={"Home Page E-commerce  "}>

      <div className="container mt-5 pt-5 ">
        <div className="row">
          <div className="col-12 col-lg-3 mt-5 pt-5 responsive  ">
            <div>

          <div className="d-flex flex-column">
              {categories?.map((c) => {
                return (
                  <div key={c._id} >
                    
                  <Checkbox
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    
                    >
                    {c.name}
                  </Checkbox>
                    </div>
                );
              })}
            </div>

            <div className="d-flex flex-column  ">
              <Radio.Group
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              >
                   {/* Price Filter  */}
            <h6 className="text-center mt-4">Filter By Price </h6>
                {Prices?.map((p) => {
                  return (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  );
                })}
              </Radio.Group>
            </div>

            <button
                className="btn btn-danger"
                onClick={() => {
                  setChecked([]); // Reset checked filters
                  setRadio([]); // Reset radio filters
                  setPage(1);; // Reset currentPage to 1
                  getAllProduct(); // Fetch initial products
                  window.location.reload();
                }}
              >
                RESET FILTERS
              </button>
          </div>

          </div>

          <div className="col-12 col-lg-9">
          <div className="d-flex flex-wrap mt-5 justify-content-center align-items-center">
        {products?.map((p) => {
          return (
            //  here we create a name in createProduct.js we also get it slug we have given in backend

              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`https://e-commerce-website-live-back-end.vercel.app/api/v1/product/product-photo/${p?._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">{p.slug}</p>
                </div>
          

<button
className="btn btn-primary ms-1 mb-2"
onClick={() => navigate(`/product/${p.slug}`)}
>
More Details
</button>
<button
className="btn btn-dark ms-1"
onClick={() => {
  addToCart(p);
}}
>
ADD TO CART
</button>
</div>

          );
        })}
      </div>

   
    
      <div className="m-2 p-3 "  style={{ textAlign: "center" }}>
              {products && products.length < total && (
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                    console.log(products.length);
                    console.log(total);
                  }}
                >


                  {loading ? "Loading ..." : "Load More"}
                </button>
              )}
            </div>

            </div>

        </div>
        
      </div>

      
    
    </Layout>
      
  )
}

export default Home
