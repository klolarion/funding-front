import { Route, Routes } from "react-router-dom"
import Index from "./pages/Index"
import SocialLogin from "./pages/auth/SocialLogin"
import MyPage from "./pages/MyPage"
import LoginPage from "./pages/auth/Login"
import ProductSearch from "./pages/ProductSearch"
import Layout from "./Layout"
import MyPayments from "./pages/Payment.tsx/MyPayments"
import GroupManagementPage from "./pages/group/GroupManage"
import PaymentMethodManagementPage from "./pages/Payment.tsx/PaymentMethod"
import Error404 from "./pages/error/Error404"
import Error500 from "./pages/error/Error500"
import GroupDetail from "./pages/group/GroupDetail"
import GroupCreate from "./pages/group/GroupCreate"
import FriendMain from "./pages/friend/FriendMain"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />}/>
          <Route path="/mypage" element={<MyPage />}/>
          <Route path="/search" element={<ProductSearch />}/>
          <Route path="/mypayments" element={<MyPayments />}/>
          <Route path="/group/manage" element={<GroupManagementPage />}/>
          <Route path="/group/detail" element={<GroupDetail />}/>
          <Route path="/group/create" element={<GroupCreate />}/>
          <Route path="/friend" element={<FriendMain />}/>
          <Route path="/payment/method" element={<PaymentMethodManagementPage />}/>
        </Route>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/social" element={<SocialLogin />}/>
        <Route path="/404" element={<Error404 />}/>
        <Route path="/500" element={<Error500 />}/>
      </Routes>
      
    </>
  )
}

export default App
