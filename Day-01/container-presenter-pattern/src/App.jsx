import "./App.css";
import ProductContainer from "./with-pattern/components/product/ProductContainer";
import UserProfileContainer from "./with-pattern/components/profile/UserProfileContainer";

function App() {
  return (
    <div>
      <UserProfileContainer userId={1} />
      <ProductContainer />
    </div>
  );
}

export default App;