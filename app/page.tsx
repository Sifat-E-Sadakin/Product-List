import Image from "next/image";
import ProductList from "./components/block/ProductList";
import { fetchData } from "./utils/DataFetcher/fetchData";

export default async function Home() {
  const data = await fetchData("products");
  const getProductList = data?.products;

  return (
    <div className="">
      <ProductList productList={getProductList} />
    </div>
  );
}
