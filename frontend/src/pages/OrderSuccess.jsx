import { Link } from "react-router-dom";

function OrderSuccess(){

return(

<div className="container text-center py-5">

<h1>
🎉
</h1>

<h2>
Order Placed Successfully
</h2>

<p>
Thank you for ordering from Usha Bakery.
</p>

<Link
to="/products"
className="btn btn-success"
>

Continue Shopping

</Link>

</div>

);

}

export default OrderSuccess;