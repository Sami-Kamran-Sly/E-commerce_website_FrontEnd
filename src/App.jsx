import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Dashboard from './user/Dashboard'
import PrivateRoute from './Routes/PrivateRoute'
import AdminDashboard from './admin/AdminDashboard'
import AdminRoute from './Routes/AdminRoute'
import CreateCategory from './admin/CreateCategory'
import CreateProduct from './admin/CreateProduct'
import Product from './admin/Product'
import UpdateProduct from './admin/UpdateProduct'
import AdminOrder from './admin/AdminOrder'
import Order from './user/Order'
import Profile from './user/Profile'
import User from './admin/User'
import Search from './pages/Search'
import ProjectsDetail from './pages/ProjectsDetail'
import CartPage from './pages/CartPage'
import Categories from './pages/Categories'
import CategoryProduct from './pages/CategoryProduct'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />

        {/* User Dashboard Routes */}
        <Route path="/dashboard/user" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Order />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path='/dashboard/admin' element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path='create-category' element={<CreateCategory />} />
          <Route path='create-product' element={<CreateProduct />} />
          <Route path='product/:slug' element={<UpdateProduct />} />
          <Route path='products' element={<Product />} />
          <Route path='users' element={<User />} />
          <Route path='orders' element={<AdminOrder />} />
        </Route>


        <Route path='/product/:slug' element={<ProjectsDetail/>} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
