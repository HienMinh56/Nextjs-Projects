
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toolData } from "../../data/data";
import { toolCartState } from "../../atom/accountState";
import { useRecoilState } from "recoil";

const ToolDetail = ( product  ) => {

  const { name } = useParams()
  const [ toolCart, setToolCart] = useRecoilState(toolCartState)
  const [ tool, setTool ] = useState()
  const [quantity, setQuantity] = useState(1);
  
  const navigate = useNavigate();

  useEffect(() => {
    const getTool = toolData.find( tool => tool.tool === name)
    setTool(getTool)
  })

  const onAddToCart = async () => {
    setToolCart([
      ...toolCart,
      {
        tool,
        quantity
      }
    ])

    navigate("/cart");
  };

  return (
    <div className="product-page mt-40 pb-40 px-40 flex items-center">
      <div className="product-image w-3/6 mr-20" >
        <img src={tool?.imageSrc} alt={tool?.tool} className="w-full" />
      </div>
      <div className="product-info w-3/6">
        <div className="product-name mb-10 flex justify-between items-center"><div>{tool?.tool}</div><div className="text-green font-bold border-2 border-green p-1 rounded-xl">$ {tool?.price}</div></div>
        <p className="product-description font-bold text-3xl">{tool?.type}</p>
        <p className="product-description font-medium text-white bg-black text-xl mt-3 p-2 inline-block rounded-lg">{tool?.category}</p>

         {/* counter */}
         <div className="custom-number-input h-10 w-32 my-10">
          <label
            for="custom-input-number"
            className="w-full text-gray-700 text-sm font-semibold"
          >
            Quantity
          </label>
          <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
              data-action="decrement"
              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              onChange={(event) => {
                if (event.target.value > 0 && event.target.value < 100) {
                  setQuantity(event.target.value);
                }
              }}
              type="number"
              max={99}
              className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
              name="custom-input-number"
              value={quantity}
            ></input>
            <button
              onClick={() => {
                if (quantity < 99) {
                  setQuantity(quantity - 1 + 2);
                }
              }}
              data-action="increment"
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>

        <button onClick={onAddToCart} className="product-add-to-cart border p-2 rounded-xl font-medium mt-5 hover:bg-black hover:text-white hover:p-3 transition-all">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ToolDetail;
