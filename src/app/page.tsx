"use client";

import React from "react";
import  { useProduct }   from "../hooks/product/useProduct";

import ProductCard from "@/components/shared/user/product-card";
import Image from "next/image";

import CustomLoading from '../../public/Loading.jpg';

export default function Home() {
  const { products, error, loading } = useProduct();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
          <Image src={CustomLoading} alt="Loading" width={360} height={420}/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-[36px]">{error.message}</p>
      </div>
    );
  }

  return (
      <main className="min-h-screen">
        <section className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} type="normal" />
            ))}
          </div>
        </section>
      </main>
  );
}
