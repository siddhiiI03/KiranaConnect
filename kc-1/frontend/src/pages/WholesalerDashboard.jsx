// // frontend/src/pages/WholesalerDashboard.jsx

// import { useEffect, useState } from 'react';
// import { Store } from "lucide-react";

// import {
//   createProduct,
//   getProducts,
//   deleteProduct,
//   getAllOrders,
//   updateOrderStatus,
//   dispatchOrder,
//   getProfile,
//   updateProfile
// } from '../services/api';

// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/useAuth';

// export default function WholesalerDashboard() {

//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [tab, setTab] = useState('dashboard');

//   const [showProfile, setShowProfile] = useState(false);

//   const [profile, setProfile] = useState({
//     shopName: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: ''
//   });

//   const [form, setForm] = useState({
//     name: '',
//     category: '',
//     description: '',
//     price: '',
//     stock: ''
//   });

//   // ================= FETCH PRODUCTS =================
//   const fetchProducts = async () => {
//     try {
//       const { data } = await getProducts();
//       setProducts(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= FETCH ORDERS =================
//   const fetchOrders = async () => {
//     try {
//       const { data } = await getAllOrders();
//       setOrders(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= FETCH PROFILE =================
//   const fetchProfile = async () => {
//     try {
//       const { data } = await getProfile();
//       setProfile(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchOrders();
//     fetchProfile();
//   }, []);

//   // ================= HANDLE INPUT =================
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   // ================= ADD PRODUCT =================
//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//       await createProduct({
//         ...form,
//         price: Number(form.price),
//         stock: Number(form.stock)
//       });

//       alert('Product Added Successfully âœ…');

//       setForm({
//         name: '',
//         category: '',
//         description: '',
//         price: '',
//         stock: ''
//       });

//       fetchProducts();

//     } catch (err) {

//       console.log(err);

//       alert(
//         err.response?.data?.message ||
//         'Failed to add product'
//       );
//     }
//   };

//   // ================= DELETE PRODUCT =================
//   const handleDelete = async (id) => {
//     try {
//       await deleteProduct(id);
//       fetchProducts();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= UPDATE STATUS =================
//   const handleStatus = async (id, status) => {
//     try {
//       await updateOrderStatus(id, status);
//       fetchOrders();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= DISPATCH =================
//   const handleDispatch = async (id) => {
//     try {
//       await dispatchOrder(id);
//       fetchOrders();
//       alert('Order Dispatched ðŸšš');
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= SAVE PROFILE =================
//   const handleProfile = async (e) => {

//     e.preventDefault();

//     try {

//       await updateProfile(profile);

//       alert('Profile Updated âœ…');

//     } catch (err) {

//       console.log(err);

//     }
//   };

//   // ================= LOGOUT =================
//   const handleLogout = () => {

//     logout();

//     navigate('/');

//   };

//   return (

//     <div className="kc-dashboard-shell kc-wholesaler-theme" style={styles.wrapper}>

//       {/* SIDEBAR */}
//       <aside style={styles.sidebar}>

//   <div style={styles.logoWrap}>

//     <div style={styles.logoIcon}>
//       <Store size={20} />
//     </div>

//     <h1 style={styles.logo}>
//       KiranaConnect
//     </h1>

//   </div>

//         <button
//           style={styles.navBtn}
//           onClick={() => setTab('dashboard')}
//         >
//           Dashboard
//         </button>

//         <button
//           style={styles.navBtn}
//           onClick={() => setTab('products')}
//         >
//           Products
//         </button>

//         <button
//           style={styles.navBtn}
//           onClick={() => setTab('orders')}
//         >
//           Orders
//         </button>

//         <button
//           style={styles.logoutBtn}
//           onClick={handleLogout}
//         >
//           Logout
//         </button>

//       </aside>

//       {/* MAIN */}
//       <main style={styles.main}>

//         {/* TOPBAR */}
//         <div style={styles.topbar}>

//           <h1 style={styles.heading}>
//             Welcome {user?.name} 
//           </h1>

//           <div
//             style={styles.profileIcon}
//             onClick={() =>
//               setShowProfile(!showProfile)
//             }
//           >
//             ðŸ‘¤
//           </div>

//         </div>

//         {/* PROFILE DROPDOWN */}
//         {showProfile && (

//           <div style={styles.profileDropdown}>

//             <h2
//   style={{
//     marginBottom: '20px',
//     fontSize: '24px',
//     fontWeight: '800',
//     color: '#2b1d15'
//   }}
// >
//               My Profile
//             </h2>

//             <form
//               style={styles.profileForm}
//               onSubmit={handleProfile}
//             >

//               <input
//                 style={styles.input}
//                 placeholder="Shop Name"
//                 value={profile.shopName}
//                 onChange={(e) =>
//                   setProfile({
//                     ...profile,
//                     shopName: e.target.value
//                   })
//                 }
//               />

//               <input
//                 style={styles.input}
//                 placeholder="Phone"
//                 value={profile.phone}
//                 onChange={(e) =>
//                   setProfile({
//                     ...profile,
//                     phone: e.target.value
//                   })
//                 }
//               />

//               <input
//                 style={styles.input}
//                 placeholder="Address"
//                 value={profile.address}
//                 onChange={(e) =>
//                   setProfile({
//                     ...profile,
//                     address: e.target.value
//                   })
//                 }
//               />

//               <input
//                 style={styles.input}
//                 placeholder="City"
//                 value={profile.city}
//                 onChange={(e) =>
//                   setProfile({
//                     ...profile,
//                     city: e.target.value
//                   })
//                 }
//               />

//               <input
//                 style={styles.input}
//                 placeholder="State"
//                 value={profile.state}
//                 onChange={(e) =>
//                   setProfile({
//                     ...profile,
//                     state: e.target.value
//                   })
//                 }
//               />

//               <input
//                 style={styles.input}
//                 placeholder="Pincode"
//                 value={profile.pincode}
//                 onChange={(e) =>
//                   setProfile({
//                     ...profile,
//                     pincode: e.target.value
//                   })
//                 }
//               />

//               <button
//                 style={styles.saveBtn}
//                 type="submit"
//               >
//                 Save Profile
//               </button>

//             </form>

//           </div>

//         )}

//         {/* DASHBOARD */}
//         {tab === 'dashboard' && (

//           <div>

//             <div style={styles.statsGrid}>

//               <div style={styles.statCard}>

//                 <h2 style={styles.statNumber}>
//                   {products.length}
//                 </h2>

//                 <p>
//                   Total Products
//                 </p>

//               </div>

//               <div style={styles.statCard}>

//                 <h2 style={styles.statNumber}>
//                   {orders.length}
//                 </h2>

//                 <p>
//                   Total Orders
//                 </p>

//               </div>

//             </div>

//           </div>

//         )}

//         {/* PRODUCTS */}
//         {tab === 'products' && (

//           <div>

//             <h1 style={styles.sectionHeading}>
//               Manage Products
//             </h1>

//             <form
//               onSubmit={handleSubmit}
//               style={styles.form}
//             >

//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Product Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />

//               <input
//                 type="text"
//                 name="category"
//                 placeholder="Category"
//                 value={form.category}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />

//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={form.description}
//                 onChange={handleChange}
//                 style={styles.textarea}
//               />

//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={form.price}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />

//               <input
//                 type="number"
//                 name="stock"
//                 placeholder="Stock"
//                 value={form.stock}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />

//               <button
//                 type="submit"
//                 style={styles.addBtn}
//               >
//                 Add Product
//               </button>

//             </form>

//             <div style={styles.grid}>

//               {products.map((product) => (

//                 <div
//                   key={product._id}
//                   style={styles.card}
//                 >

//                   <h2>
//                     {product.name}
//                   </h2>

//                   <p>
//                     {product.category}
//                   </p>

//                   <p>
//                     {product.description}
//                   </p>

//                   <h3>
//                     â‚¹{product.price}
//                   </h3>

//                   <p>
//                     Stock: {product.stock}
//                   </p>

//                   <button
//                     onClick={() =>
//                       handleDelete(product._id)
//                     }
//                     style={styles.deleteBtn}
//                   >
//                     Delete Product
//                   </button>

//                 </div>

//               ))}

//             </div>

//           </div>

//         )}

//         {/* ORDERS */}
//         {tab === 'orders' && (

//           <div>

//             <h1 style={styles.sectionHeading}>
//               Orders
//             </h1>

//             <div style={styles.ordersContainer}>

//               {orders.map((order) => (

//                 <div
//                   key={order._id}
//                   style={styles.orderCard}
//                 >

//                   <h2>
//                     {
//                       order.kirana?.shopName ||
//                       order.kirana?.name
//                     }
//                   </h2>

//                   <p>
//                     ðŸ‘¤ Owner: {order.kirana?.name}
//                   </p>

//                   <p>
//                     ðŸ“ž Phone: {order.kirana?.phone}
//                   </p>

//                   <div style={styles.addressBox}>

//                     ðŸ“ Delivery Address:

//                     {' '}

//                     {order.kirana?.address},

//                     {' '}

//                     {order.kirana?.city},

//                     {' '}

//                     {order.kirana?.state}

//                     -

//                     {order.kirana?.pincode}

//                   </div>

//                   <p>
//                     ðŸ’° Earnings: â‚¹{order.totalAmount}
//                   </p>

//                   <p>
//                     ðŸ“¦ Status: {order.status}
//                   </p>

//                   <select
//                     style={styles.select}
//                     value={order.status}
//                     onChange={(e) =>
//                       handleStatus(
//                         order._id,
//                         e.target.value
//                       )
//                     }
//                   >

//                     <option value="pending">
//                       Pending
//                     </option>

//                     <option value="confirmed">
//                       Confirmed
//                     </option>

//                     <option value="shipped">
//                       Shipped
//                     </option>

//                     <option value="delivered">
//                       Delivered
//                     </option>

//                     <option value="cancelled">
//                       Cancelled
//                     </option>

//                   </select>

//                   <button
//                     style={styles.dispatchBtn}
//                     onClick={() =>
//                       handleDispatch(order._id)
//                     }
//                   >
//                     ðŸšš Dispatch Order
//                   </button>

//                 </div>

//               ))}

//             </div>

//           </div>

//         )}

//       </main>

//     </div>

//   );

// }

// const styles = {

//   wrapper: {
//     display: 'flex',
//     minHeight: '100vh',
//     background: 'var(--kc-bg)',
//     fontFamily: 'var(--font-body)'
//   },

//   sidebar: {
//   width: "250px",

//   background: "#24170f",

//   padding: "30px 20px",

//   display: "flex",

//   flexDirection: "column",

//   gap: "14px",
// },

// logoWrap: {
//   display: "flex",
//   alignItems: "center",
//   gap: "12px",
//   marginBottom: "34px",
// },

// logoIcon: {
//   width: "48px",
//   height: "48px",
//   borderRadius: "16px",
//   background: "#6f4e37",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   color: "#fff",
//   flexShrink: 0,
// },

// logo: {
//   color: "#fff",
//   fontSize: "18px",
//   fontWeight: "700",
//   margin: 0,
//   whiteSpace: "nowrap",
// },

// navBtn: {
//   padding: "14px",

//   border: "none",

//   borderRadius: "10px",

//   background: "#2b1d14",

//   color: "#fff",

//   cursor: "pointer",

//   textAlign: "left",

//   fontWeight: "600",
// },

// logoutBtn: {
//   marginTop: "auto",

//   padding: "14px",

//   border: "none",

//   borderRadius: "10px",

//   background: "#dc2626",

//   color: "#fff",

//   cursor: "pointer",

//   fontWeight: "700",
// },

// main: {
//   flex: 1,
//   padding: "40px",
// },

// topbar: {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: "30px",
// },

// heading: {
//   fontSize: "36px",
//   margin: 0,
//   color: "#2b1d15",
//   fontWeight: "700",
// },

// sectionHeading: {
//   fontSize: "36px",
//   marginBottom: "20px",
//   color: "#2b1d15",
//   fontWeight: "700",
// },

// profileIcon: {
//   width: "42px",
//   height: "42px",
//   borderRadius: "50%",
//   color: "#fff",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   cursor: "pointer",
//   fontSize: "18px",
// },

// profileDropdown: {
//   background: "#fff",
//   border: "1px solid #e6d8c8",
//   borderRadius: "20px",
//   padding: "30px",
//   marginBottom: "30px",
//   maxWidth: "500px",
// },

// statsGrid: {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
//   gap: "20px",
// },

// statCard: {
//   background: "#fff",
//   padding: "24px",
//   borderRadius: "20px",
//   border: "1px solid #e6d8c8",
//   boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
// },

// statNumber: {
//   fontSize: "36px",
//   color: "#6f4e37",
//   marginBottom: "8px",
// },

// form: {
//   display: "flex",
//   flexDirection: "column",
//   gap: "16px",
//   background: "#fff",
//   padding: "30px",
//   borderRadius: "20px",
//   border: "1px solid #e6d8c8",
//   marginBottom: "30px",
// },

// input: {
//   padding: "14px",
//   borderRadius: "10px",
//   border: "1px solid #e6d8c8",
//   background: "#fff",
//   fontSize: "14px",
// },

// textarea: {
//   padding: "14px",
//   borderRadius: "10px",
//   border: "1px solid #e6d8c8",
//   minHeight: "120px",
//   fontSize: "14px",
// },

// addBtn: {
//   width: "100%",
//   padding: "14px",
//   border: "none",
//   borderRadius: "10px",
//   background: "#6f4e37",
//   color: "#fff",
//   cursor: "pointer",
//   fontWeight: "700",
// },

// grid: {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
//   gap: "20px",
// },

// card: {
//   background: "#fff",
//   padding: "24px",
//   borderRadius: "20px",
//   border: "1px solid #e6d8c8",
//   boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
// },

// deleteBtn: {
//   width: "100%",
//   marginTop: "14px",
//   padding: "12px",
//   border: "none",
//   borderRadius: "10px",
//   background: "#6f4e37",
//   color: "#fff",
//   cursor: "pointer",
//   fontWeight: "700",
// },

// ordersContainer: {
//   display: "flex",
//   flexDirection: "column",
//   gap: "20px",
// },

// orderCard: {
//   background: "#fff",
//   padding: "24px",
//   borderRadius: "20px",
//   border: "1px solid #e6d8c8",
//   marginBottom: "20px",
// },

// select: {
//   marginTop: "14px",
//   padding: "14px",
//   borderRadius: "10px",
//   width: "100%",
//   border: "1px solid #e6d8c8",
// },

// addressBox: {
//   background: "#f7efe6",
//   padding: "14px 16px",
//   borderRadius: "12px",
//   marginTop: "14px",
//   marginBottom: "14px",
//   color: "#6f4e37",
// },

// dispatchBtn: {
//   marginTop: "16px",
//   width: "100%",
//   padding: "14px",
//   border: "none",
//   borderRadius: "10px",
//   background: "#6f4e37",
//   color: "#fff",
//   cursor: "pointer",
//   fontWeight: "700",
// },

// profileForm: {
//   display: "flex",
//   flexDirection: "column",
//   gap: "16px",
// },

// saveBtn: {
//   padding: "14px",
//   border: "none",
//   borderRadius: "10px",
//   background: "#6f4e37",
//   color: "#fff",
//   cursor: "pointer",
//   fontWeight: "700",
// },

// };

import { useEffect, useState } from 'react';
import { Store } from "lucide-react";

import {
  createProduct,
  getProducts,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
 dispatchOrder,
  getProfile,
  updateProfile
} from '../services/api';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function WholesalerDashboard() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState('dashboard');

  const [profile, setProfile] = useState({
    shopName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock: ''
  });

  // ================= FETCH PRODUCTS =================

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FETCH ORDERS =================

  const fetchOrders = async () => {
    try {
      const { data } = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FETCH PROFILE =================

  const fetchProfile = async () => {
    try {
      const { data } = await getProfile();
      setProfile(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([
        fetchProducts(),
        fetchOrders(),
        fetchProfile()
      ]);
    };

    loadInitialData();
  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= ADD PRODUCT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      });

      alert('Product Added Successfully');

      setForm({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: ''
      });

      fetchProducts();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        'Failed to add product'
      );
    }
  };

  // ================= DELETE PRODUCT =================

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UPDATE STATUS =================

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DISPATCH =================

  const handleDispatch = async (id) => {
    try {
      await dispatchOrder(id);
      fetchOrders();
      alert('Order Dispatched ');
    } catch (err) {
      console.log(err);
    }
  };

  // ================= SAVE PROFILE =================

  const handleProfile = async (e) => {

    e.preventDefault();

    try {

      await updateProfile(profile);

      alert('Profile Updated âœ…');

    } catch (err) {

      console.log(err);

    }
  };

  // ================= LOGOUT =================

  const handleLogout = () => {

    logout();

    navigate('/');

  };

  return (

    <div className="kc-dashboard-shell kc-wholesaler-theme" style={styles.wrapper}>

      {/* SIDEBAR */}

      <aside style={styles.sidebar}>

        <div style={styles.logoWrap}>

          <div style={styles.logoIcon}>
            <Store size={20} />
          </div>

          <h1 style={styles.logo}>
            KiranaConnect
          </h1>

        </div>

        <button
          style={styles.navBtn}
          onClick={() => setTab('dashboard')}
        >
          Dashboard
        </button>

        <button
          style={styles.navBtn}
          onClick={() => setTab('products')}
        >
          Products
        </button>

        <button
          style={styles.navBtn}
          onClick={() => setTab('orders')}
        >
          Orders
        </button>
        <button style={styles.navBtn} onClick={() => navigate("/analytics")}>Analytics</button>
        <button style={styles.navBtn} onClick={() => navigate("/profile")}>Profile</button>
        <button style={styles.navBtn} onClick={() => navigate("/settings")}>Settings</button>
        <button style={styles.navBtn} onClick={() => navigate("/support")}>Support</button>


        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      {/* MAIN */}

      <main style={styles.main}>

        <div style={styles.topbar}>

          <h1 style={styles.heading}>
            Welcome {user?.name}
          </h1>

          <div
  style={styles.profileIcon}
  onClick={() => setTab('profile')}
>
  👤
</div>

        </div>

        {/* DASHBOARD */}

        {tab === 'dashboard' && (

          <div>

            <div style={styles.statsGrid}>

              <div style={styles.statCard}>

                <h2 style={styles.statNumber}>
                  {products.length}
                </h2>

                <p>Total Products</p>

              </div>

              <div style={styles.statCard}>

                <h2 style={styles.statNumber}>
                  {orders.length}
                </h2>

                <p>Total Orders</p>

              </div>

            </div>

          </div>

        )}

        {/* PRODUCTS */}

        {tab === 'products' && (

          <div>

            <h1 style={styles.sectionHeading}>
              Manage Products
            </h1>

            <form
              onSubmit={handleSubmit}
              style={styles.form}
            >

              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                style={styles.textarea}
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <button
                type="submit"
                style={styles.addBtn}
              >
                Add Product
              </button>

            </form>

            <div style={styles.grid}>

              {products.map((product) => (

                <div
                  key={product._id}
                  style={styles.card}
                >

                  <h2>{product.name}</h2>

                  <p>{product.category}</p>

                  <p>{product.description}</p>

                  <h3>rs.{product.price}</h3>

                  <p>
                    Stock: {product.stock}
                  </p>

                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    style={styles.deleteBtn}
                  >
                    Delete Product
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* ORDERS */}

        {tab === 'orders' && (

          <div>

            <h1 style={styles.sectionHeading}>
              Orders
            </h1>

            <div style={styles.ordersContainer}>

              {orders.map((order) => (

                <div
                  key={order._id}
                  style={styles.orderCard}
                >

                  <h2>
                    {
                      order.kirana?.shopName ||
                      order.kirana?.name
                    }
                  </h2>

                  <p>
                     Owner: {order.kirana?.name}
                  </p>

                  <p>
                    Phone: {order.kirana?.phone}
                  </p>

                  <div style={styles.addressBox}>

                    Delivery Address:

                    {' '}

                    {order.kirana?.address},

                    {' '}

                    {order.kirana?.city},

                    {' '}

                    {order.kirana?.state}

                    -

                    {order.kirana?.pincode}

                  </div>

                  <p>
                     Earnings: ₹{order.totalAmount}
                  </p>

                  <p>
                    Status: {order.status}
                  </p>

                  <select
                    style={styles.select}
                    value={order.status}
                    onChange={(e) =>
                      handleStatus(
                        order._id,
                        e.target.value
                      )
                    }
                  >

                    <option value="pending">
                      Pending
                    </option>

                    <option value="confirmed">
                      Confirmed
                    </option>

                    <option value="shipped">
                      Shipped
                    </option>

                    <option value="delivered">
                      Delivered
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>

                  </select>

                  <button
                    style={styles.dispatchBtn}
                    onClick={() =>
                      handleDispatch(order._id)
                    }
                  >
                     Dispatch Order
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* PROFILE */}

        {tab === 'profile' && (

          <div>

            <h1 style={styles.sectionHeading}>
              My Profile
            </h1>

            <form
              style={styles.profileForm}
              onSubmit={handleProfile}
            >

              <input
                style={styles.input}
                placeholder="Shop Name"
                value={profile.shopName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    shopName: e.target.value
                  })
                }
              />

              <input
                style={styles.input}
                placeholder="Phone"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    phone: e.target.value
                  })
                }
              />

              <input
                style={styles.input}
                placeholder="Address"
                value={profile.address}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    address: e.target.value
                  })
                }
              />

              <input
                style={styles.input}
                placeholder="City"
                value={profile.city}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    city: e.target.value
                  })
                }
              />

              <input
                style={styles.input}
                placeholder="State"
                value={profile.state}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    state: e.target.value
                  })
                }
              />

              <input
                style={styles.input}
                placeholder="Pincode"
                value={profile.pincode}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    pincode: e.target.value
                  })
                }
              />

              <button
                style={styles.saveBtn}
                type="submit"
              >
                Save Profile
              </button>

            </form>

          </div>

        )}

      </main>

    </div>

  );

}

const styles = {

  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8f5f1",
    fontFamily: "Inter, sans-serif",
  },

  sidebar: {
    width: "250px",
    background: "#24170f",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "34px",
  },

  logoIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    background: "#6f4e37",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    flexShrink: 0,
  },

  logo: {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "700",
    margin: 0,
    whiteSpace: "nowrap",
  },

  navBtn: {
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#2b1d14",
    color: "#fff",
    cursor: "pointer",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "15px",
  },

  logoutBtn: {
    marginTop: "auto",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#dc2626",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
  },

  main: {
    flex: 1,
    padding: "40px",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  heading: {
    fontSize: "36px",
    margin: 0,
    color: "#2b1d15",
    fontWeight: "700",
  },

  sectionHeading: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#2b1d15",
    fontWeight: "700",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "20px",
  },

  statCard: {
    background: "#fff",
    padding: "24px",
    borderRadius: "20px",
    border: "1px solid #e6d8c8",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },

  statNumber: {
    fontSize: "36px",
    color: "#6f4e37",
    marginBottom: "8px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    border: "1px solid #e6d8c8",
    marginBottom: "30px",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #e6d8c8",
    background: "#fff",
    fontSize: "14px",
  },

  textarea: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #e6d8c8",
    minHeight: "120px",
    fontSize: "14px",
  },

  addBtn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#6f4e37",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "24px",
    borderRadius: "20px",
    border: "1px solid #e6d8c8",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },

  deleteBtn: {
    width: "100%",
    marginTop: "14px",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#6f4e37",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
  },

  ordersContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  orderCard: {
    background: "#fff",
    padding: "24px",
    borderRadius: "20px",
    border: "1px solid #e6d8c8",
  },

  select: {
    marginTop: "14px",
    padding: "14px",
    borderRadius: "10px",
    width: "100%",
    border: "1px solid #e6d8c8",
  },

  addressBox: {
    background: "#f7efe6",
    padding: "14px 16px",
    borderRadius: "12px",
    marginTop: "14px",
    marginBottom: "14px",
    color: "#6f4e37",
  },

  dispatchBtn: {
    marginTop: "16px",
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#6f4e37",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
  },

  profileIcon: {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  cursor: "pointer",
},

  profileForm: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    border: "1px solid #e6d8c8",
    maxWidth: "520px",
  },

  saveBtn: {
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#6f4e37",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
  },

};