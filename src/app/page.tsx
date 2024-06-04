"use client";

import React from "react";
import  { useProduct }   from "../hooks/product/useProduct";

import ProductCard from "@/components/shared/user/product-card";
import Image from "next/image";

import CustomLoading from '../../public/Loading.jpg';

import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/shared/user/skeleton-card";

export default function Home() {
  const { products, error, loading } = useProduct();

  return (
    <section className="min-h-screen px-10 py-2">
      {/* Handling Loading State */}
      {loading && (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <p className="text-center py-4">Đang tải, xin chờ chút</p>
        </section>
      )}
      {/* Handling Error State */}
      {error && <p>{error.message}</p>}
      {/* Handling Success State */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} type="normal"/>
        ))}
      </div>
    </section>
  )
}
