import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";

/** Member **/

router.get("/member/admin", memberController.getAdmin);

router.post("/member/login", memberController.login); // call
router.post("/member/signup", memberController.signup); // call done
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout
); // done
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail
); // done

router.post(
  "/member/update",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  memberController.updateMember
); // done

/** Product **/
// get top products

router.get("/product/top-products", productController.getTopProducts);

router.get("/product/all", productController.getProducts);
router.get(
  "/product/:id",
  memberController.retrieveAuth,
  productController.getProduct
);

/** Order **/

router.post(
  "/order/create",
  memberController.verifyAuth,
  orderController.createOrder
);

router.get(
  "/order/all",
  memberController.verifyAuth,
  orderController.getMyOrders
);

router.post(
  "/order/update",
  memberController.verifyAuth,
  orderController.updateOrder
);

export default router;
