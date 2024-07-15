"use client";

import React, { useRef } from "react";
import { useProduct } from "../hooks/product/useProduct";

import ProductCard from "@/components/shared/user/product-card";
import Image from "next/image";

import CustomLoading from "../../public/Loading.jpg";

//For Banner
import Banner_1 from "../../public/Banner_1.jpg";
import Banner_2 from "../../public/Banner_2.jpg";
import Banner_3 from "../../public/Banner_3.jpg";
import Banner_4 from "../../public/Banner_4.jpg";
import Banner_5 from "../../public/Banner_5.jpg";

import { SkeletonCard } from "@/components/shared/user/skeleton-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight, ChevronRightCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserHeader from "@/components/shared/user/user-header";
import UserFooter from "@/components/shared/user/user-footer";
import { useProductCategory } from "@/hooks/product/useProductCategory";

import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const { products, error, loading } = useProduct();
  
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true})
  );

  const ImageBanners = [
    Banner_1,
    Banner_2,
    Banner_3,
    Banner_4,
    Banner_5,
  ]

  return (
    <motion.main
      initial={{ y: 100, opacity: 0, overflowX: "hidden" }}
      animate={{ y: 0, opacity: 1, overflowX: "hidden" }}
      transition={{ type: "easeIn", duration: 0.5, delay: 1.05 }}
    >
      <UserHeader />
      <section className="min-h-screen mx-auto px-10 py-2">
        <Carousel 
          plugins={[plugin.current]}
          className="w-full max-w-[90%] mx-auto rounded-[8px] shadow-md"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}>
          <CarouselPrevious />
          <CarouselContent>
            {ImageBanners.map((image) => (
              <CarouselItem key={image.src}>
                <Image src={image} alt="Banner" className="rounded-[8px] shadow-md h-[360px] w-full object-cover" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
        {/* Handling Error State */}
        {error && <p>{error.message}</p>}
        
        {/* Handling Success State */}
        <section>
          {/* Product Listing */}
          {/* Product will be sorted depending on their Specialty Attribute */}
          {/* First, get each specialty 4 products each */}
          {/* For each specialty their will be a section for them to display */}
          <div className="flex flex-col gap-4 justify-end">
            <h1 className="text-2xl text-center uppercase font-bold py-4">
              Sản phẩm nổi bật
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {loading && (
                  <div className="grid grid-cols-subgrid col-span-4 my-4">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </div>
                )}
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
              {loading && (
                <div className="grid grid-cols-subgrid col-span-4 my-4">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              )}
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
              {loading && (
                <div className="grid grid-cols-subgrid col-span-4 my-4">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              )}
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
              {loading && (
                <div className="grid grid-cols-subgrid col-span-4 my-4">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              )}
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
    </motion.main>
  );
}
