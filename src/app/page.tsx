"use client";

import React from "react";
import { useProduct } from "../hooks/product/useProduct";

import ProductCard from "@/components/shared/user/product-card";
import Image from "next/image";

import CustomLoading from "../../public/Loading.jpg";

import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/shared/user/skeleton-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight, ChevronRightCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserHeader from "@/components/shared/user/user-header";
import UserFooter from "@/components/shared/user/user-footer";

export default function Home() {
  const { products, error, loading } = useProduct();

  function renderCustomLoading() {
    const customLoadingList = [];

    for (let i = 0; i < 5; i++) {
      customLoadingList.push(
        <CarouselItem>
          <Image
            src={CustomLoading}
            alt="Slide"
            className="w-full h-[360px] rounded-[4px] object-cover"
          />
        </CarouselItem>
      );
    }

    return customLoadingList;
  }

  return (
    <>
      <UserHeader />
      <section className="min-h-screen px-10 py-2">
        <Carousel className="w-[90%] mx-auto my-4">
          <CarouselContent>{renderCustomLoading()}</CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* Handling Error State */}
        {error && <p>{error.message}</p>}
        {loading && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-4 justify-items-center gap-10">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </section>
        )}
        {/* Handling Success State */}
        <section>
          {/* Category Browsing */}
          <div>
            <h1 className="text-2xl text-center uppercase font-bold py-4">
              Danh mục sản phẩm
            </h1>
            <p className="text-center font-semibold">
              Thử lựa chọn 1 trong các danh mục sau để tìm kiếm sản phẩm cho phù
              hợp
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-4 rounded-lg p-4">
                <Image
                  src={CustomLoading}
                  alt="Category"
                  className="rounded-[8px] shadow-md"
                />
                <p className="text-center font-semibold">Tên danh mục</p>
              </div>
              <div className="flex flex-col gap-4 rounded-lg p-4">
                <Image
                  src={CustomLoading}
                  alt="Category"
                  className="rounded-[8px] shadow-md"
                />
                <p className="text-center font-semibold">Tên danh mục</p>
              </div>
              <div className="flex flex-col gap-4 rounded-lg p-4">
                <Image
                  src={CustomLoading}
                  alt="Category"
                  className="rounded-[8px] shadow-md"
                />
                <p className="text-center font-semibold">Tên danh mục</p>
              </div>
              <div className="flex flex-col gap-4 rounded-lg p-4">
                <Image
                  src={CustomLoading}
                  alt="Category"
                  className="rounded-[8px] shadow-md"
                />
                <p className="text-center font-semibold">Tên danh mục</p>
              </div>
            </div>
          </div>
          {/* Product Listing */}
          {/* Product will be sorted depending on their Specialty Attribute */}
          {/* First, get each specialty 4 products each */}
          {/* For each specialty their will be a section for them to display */}
          <div className="flex flex-col gap-4 justify-end">
            <h1 className="text-2xl text-center uppercase font-bold py-4">
              Sản phẩm nổi bật
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.productId} product={product} type="normal" />
              ))}
            <Link href={'/products'} className="w-fit rounded-[4px] grid grid-cols-subgrid col-start-4 justify-items-end text-right text-gray-700 font-semibold hover:underline hover:underline-offet-2 hover:text-pink-500">
              <Button variant={'ghost'} >
                  <span className="flex justify-end gap-4 items-center">
                    Xem Thêm Sản Phẩm
                    <ChevronRight size={16} />
                  </span>
              </Button>
            </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-end">
            <h1 className="text-2xl text-center uppercase font-bold py-4">
              Sản phẩm giảm giá
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.productId} product={product} type="discount" />
              ))}
              <Link href={'/products'} className="w-fit rounded-[4px] grid grid-cols-subgrid col-start-4 justify-items-end text-right text-gray-700 font-semibold hover:underline hover:underline-offet-2 hover:text-pink-500">
                <Button variant={'ghost'} >
                  <span className="flex justify-end gap-4 items-center">
                    Xem Thêm Sản Phẩm
                    <ChevronRight size={16} />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-end">
            <h1 className="text-2xl text-center uppercase font-bold py-4">
              Sản phẩm đặc biệt
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.productId} product={product} type="special" />
              ))}
              <Link href={'/products'} className="w-fit rounded-[4px] grid grid-cols-subgrid col-start-4 justify-items-end text-right text-gray-700 font-semibold hover:underline hover:underline-offet-2 hover:text-pink-500">
                <Button variant={'ghost'}>
                  <span className="flex justify-end gap-4 items-center">
                    Xem Thêm Sản Phẩm
                    <ChevronRight size={16} />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-end">
            <h1 className="text-2xl text-center uppercase font-bold py-4">
              Sản phẩm mới
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.productId} product={product} type="normal" />
              ))}
              <Link href={'/products'} className="w-fit rounded-[4px] grid grid-cols-subgrid col-start-4 justify-items-end text-right text-gray-700 font-semibold hover:underline hover:underline-offet-2 hover:text-pink-500">
                <Button variant={'ghost'}>
                  <span className="flex justify-end gap-4 items-center">
                    Xem Thêm Sản Phẩm
                    <ChevronRight size={16} />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/* Handling Loading State */}
      </section>
      <UserFooter />
    </>
  );
}
