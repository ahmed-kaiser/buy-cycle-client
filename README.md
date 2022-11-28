## BuyCycle
BuyCycle is a single-page full-stack web application. Where anyone can buy and sell their old bicycle. The whole structure of this website is divided into three parts based on user, seller, and admin.

#### Live Website Link

https://buy-cycle-client.web.app/

### Project Feature
* Feature keyword - Sign-In  | Sign-Up | Google Sign-In | User Authentication | User Authorization | Booking |  Wishlist | Report | Make Payment | Create | Read | Update | Delete.
* First the expected common feature is sign-in, sign-up, and sign-up with a google account. In the sign-up section, the user can choose his account type as seller or buyer. Google sign-up will automatically be considered as a buyer account.
* Buyers can book or report a bicycle and also add a bicycle to his/her wish list. From the buyer dashboard, a buyer can perform payment, delete bookings and delete items from the wishlist.
* Sellers can add a product, delete a product and send a product for advertising. The advertised product is shown on the home page. If a product is sold out it gets removed from the advertising section automatically. The seller can view all his/her added products and booking details.
* Admin can view and delete all types of users. In the seller's list, there is a verification option to verify sellers. Admin can view all the reports made by buyers and also delete those.
* All these three layers are isolated from one another. User authentication and authorization are implemented to control different types of user access. 

### Used Technology
* ReactJS, react-router-dom, react-hot-toast, Tailwind, MAMBA UI for frontend.
* Node.js, Express.js for backend. 
* Firebase for user authentication.
* Stripe for payment.
* MongoDB for database.

### Context of this project
This project was a 2-3 day long project built during my learning journey of web development. Project goals included using technology learned up until this point.

### Project State
Till lots more functionality can be implemented.
