import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productApi";
import "../../style/Dashboard.css";


function Dashboard() {

  const {
    data = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });


  if (isLoading) {
    return (
      <div className="loading">
        Loading products...
      </div>
    );
  }


  if (isError) {
    return (
      <div className="error">
        Something went wrong!
      </div>
    );
  }


  return (

    <div className="dashboard-container">


      {/* Header */}

      <div className="dashboard-header">

        <div>
          <h1>Admin Dashboard</h1>
          <p>
            Manage your Nexus E-Commerce products
          </p>
        </div>

      </div>



      {/* Dashboard Cards */}

      <div className="stats-container">


        <div className="stat-card">
          <h2>{data.length}</h2>
          <p>Total Products</p>
        </div>


        <div className="stat-card">
          <h2>₹85,000</h2>
          <p>Total Revenue</p>
        </div>


        <div className="stat-card">
          <h2>120</h2>
          <p>Total Orders</p>
        </div>


      </div>




      {/* Product Table */}

      <div className="table-card">


        <table className="product-table">


          <thead>

            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Status</th>
            </tr>

          </thead>



          <tbody>


            {
              data.map((product) => (

                <tr key={product.id}>


                  <td>
                    {product.id}
                  </td>



                  <td>

                    <img
                      src={product.image}
                      alt={product.title}
                    />

                  </td>




                  <td>
                    {product.title}
                  </td>




                  <td className="price">

                    ₹{product.price}

                  </td>




                  <td>

                    <span className="status">
                      Available
                    </span>

                  </td>



                </tr>

              ))
            }


          </tbody>


        </table>


      </div>


    </div>

  );

}


export default Dashboard;