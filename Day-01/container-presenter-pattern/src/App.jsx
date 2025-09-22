// import UserProfile from "./messy-way/components/UserProfile";

import "./App.css";
import ProductListContainer from "./with-pattern/components/product/ProductListContainer";
import UserProfileContainer from "./with-pattern/components/profile/UserProfileContainer";
function App() {
  return (
    <div>
      <UserProfileContainer userId={1} />
      <hr />
      <ProductListContainer />
    </div>
  );
}

export default App;
