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
            className="w-[640px] h-[360px] rounded-[4px] object-cover"
          />
        </CarouselItem>
      );
    }

    return customLoadingList;
  }

  return (
    <section className="min-h-screen px-10 py-2">
      <section className="flex justify-between items-center my-4">
        <ul className="flex flex-col gap-8 w-[640px] h-full">
          <li className="border-b-[1px] border-r-[1px] rounded-[4px] shadow-sm hover:bg-gray-500/60 hover:text-white transition-all duration-300 cursor-pointer">
            <span className="text-[18px] px-4 py-3 flex justify-between items-center">
              <p className="font-semibold">Danh mục</p>
              <Link href={"/products/"}>
                <ChevronRightCircle size={24} />
              </Link>
            </span>
          </li>
          <li className="border-b-[1px] border-r-[1px] rounded-[4px] shadow-sm hover:bg-gray-500/60 hover:text-white transition-all duration-300 cursor-pointer">
            <span className="text-[18px] px-4 py-3 flex justify-between items-center">
              <p className="font-semibold">Danh mục</p>
              <Link href={"/products/"}>
                <ChevronRightCircle size={24} />
              </Link>
            </span>
          </li>
          <li className="border-b-[1px] border-r-[1px] rounded-[4px] shadow-sm hover:bg-gray-500/60 hover:text-white transition-all duration-300 cursor-pointer">
            <span className="text-[18px] px-4 py-3 flex justify-between items-center">
              <p className="font-semibold">Danh mục</p>
              <Link href={"/products/"}>
                <ChevronRightCircle size={24} />
              </Link>
            </span>
          </li>
          <li className="border-b-[1px] border-r-[1px] rounded-[4px] shadow-sm hover:bg-gray-500/60 hover:text-white transition-all duration-300 cursor-pointer">
            <span className="text-[18px] px-4 py-3 flex justify-between items-center">
              <p className="font-semibold">Danh mục</p>
              <Link href={"/products/"}>
                <ChevronRightCircle size={24} />
              </Link>
            </span>
          </li>
        </ul>
        <Carousel className="w-[640px] mr-10">
          <CarouselContent>{renderCustomLoading()}</CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
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
              <ProductCard key={product.id} product={product} type="normal" />
            ))}
            <Button
              variant={"ghost"}
              className="w-fit rounded-[4px] grid grid-cols-subgrid col-start-4 text-right text-gray-700 font-semibold hover:underline hover:underline-offet-2 hover:text-pink-500"
            >
              <span className="flex justify-end gap-4 items-center">
                Xem Thêm Sản Phẩm
                <ChevronRight size={16} />
              </span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-end">
          <h1 className="text-2xl text-center uppercase font-bold py-4">
            Sản phẩm giảm giá
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} type="discount" />
            ))}
            <Button
              variant={"ghost"}
              className="w-fit rounded-[4px] grid grid-cols-subgrid col-start-4 text-right text-gray-700 font-semibold hover:underline hover:underline-offet-2 hover:text-pink-500"
            >
              <span className="flex justify-end gap-4 items-center">
                Xem Thêm Sản Phẩm
                <ChevronRight size={16} />
              </span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-end">
          <h1 className="text-2xl text-center uppercase font-bold py-4">
            Sản phẩm đặc biệt
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} type="special" />
            ))}
            <Button
              variant={"ghost"}
              className="w-fit rounded-[4px] grid grid-cols-subgrid col-start-4 text-right text-gray-700 font-semibold hover:underline hover:underline-offet-2 hover:text-pink-500"
            >
              <span className="flex justify-end gap-4 items-center">
                Xem Thêm Sản Phẩm
                <ChevronRight size={16} />
              </span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-end">
          <h1 className="text-2xl text-center uppercase font-bold py-4">
            Sản phẩm mới
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} type="normal" />
            ))}
            <Button
              variant={"ghost"}
              className="w-fit rounded-[4px] grid grid-cols-subgrid col-start-4 text-right text-gray-700 font-semibold hover:underline hover:underline-offet-2 hover:text-pink-500"
            >
              <span className="flex justify-end gap-4 items-center">
                Xem Thêm Sản Phẩm
                <ChevronRight size={16} />
              </span>
            </Button>
          </div>
        </div>
      </section>
      {/* Handling Loading State */}
    </section>
  );
}
