import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [currentSelectedPage, setCurrentSelectedPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    console.log(json.products);
    setProducts(json.products);
  };

  const PAGE_SIZE = 10;
  const noOfPages = Math.ceil(products.length/PAGE_SIZE);
  const start = currentSelectedPage * PAGE_SIZE;
  const end = start + PAGE_SIZE; 

  const handlePageClick= (n)=> {
    setCurrentSelectedPage(n);
  }

  const handlePrevClicked = ()=>{
      setCurrentSelectedPage((prev)=>prev-1)
  } 

  const handleNextClicked = ()=>{
 setCurrentSelectedPage((prev)=>prev+1)
  } 

  return (
    <>
      <h1 className="text-4xl font-bold underline">Pagination</h1>
      
      <div>
        <button disabled={currentSelectedPage == 0} onClick={handlePrevClicked} className="w-10 disabled:opacity-30">⬅️</button>
        {[...Array(noOfPages)]
                    .map((_,n)=> (<span className={`text-2xl mx-1 px-2 ${currentSelectedPage == n ? "bg-amber-300": ""}`} key={n} onClick={()=> handlePageClick(n)} >{n+1}</span>)) }
        <button disabled={currentSelectedPage == noOfPages-1}  onClick={handleNextClicked} className="w-10 disabled:opacity-30">➡️</button>
        </div>
      
      <div className="product-container flex flex-wrap">
        {products.length >0 &&
          products.slice(start, end).map((prod) => (
            <div key={prod.id}>
              <div>
                <img src={prod.thumbnail} alt="ProductImage" />
                {}
              </div>
              <h2>{prod.title}</h2>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
