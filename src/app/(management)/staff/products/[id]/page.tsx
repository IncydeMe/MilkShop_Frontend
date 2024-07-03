'use client';

import React from 'react'
import { useSingleProduct, deleteProduct } from '@/hooks/product/useProduct'
import { Button } from '@/components/ui/button';
import { ChevronLeft, SquarePen, Star, Trash2 } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useSingleCategory } from '@/hooks/product/useProductCategory';
import { useFeedbacksByProduct } from '@/hooks/feedback/feedback';
import { useFeedbackMediaList } from '@/hooks/feedback/feedbackMedia';
import FeedbackCard from '@/components/shared/user/feedback-card';
import StaffProductFeedbackCard from '@/components/shared/management/staff/staff-product-feedback-card';

const RatingToStars = ({ rating = 0 }: { rating?: number }) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<Star size={24} color='yellow'/>);
    }
    return stars;
}


function ProductDetailsPage({params}: {params: {id: number}}) {
    const { product, loading, error } = useSingleProduct(params.id);
    const { category } = useSingleCategory(product?.productCategoryId || 0);

    const { feedbacks, loading: feedbackLoading, error: feedbackError } = useFeedbacksByProduct(params.id);
    const { feedbackMediaList } = useFeedbackMediaList();

    const getFeedbackMedia = (feedbackId: number) => {
        const fmlProduct = feedbackMediaList.filter((media) => media.feedbackId === feedbackId)
        return fmlProduct;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    const categoryBadge = () => {
      let badgeColor = '';
      switch (category?.productCategoryId) {
          case 1:
              badgeColor = 'blue';
              break;
          case 2:
              badgeColor = 'green';
              break;
          case 3:
              badgeColor = 'yellow';
              break;
          case 4:
              badgeColor = 'indigo';
              break;
          case 5:
              badgeColor = 'pink';
              break;
          case 6: 
              badgeColor = 'purple';
              break;
          default:
              badgeColor = 'red';
              break;
      }

      return (
          <>
              {
                  category && <Badge className={`text-white bg-${badgeColor}-500 hover:bg-${badgeColor}-700 w-fit`}>{category.categoryName}</Badge>
              }
          </>
      )
  }

    return (
        <section className='flex flex-col gap-10'>
            <section className='flex items-center gap-6'>
                <Link href='/staff/products'><ChevronLeft size={36} /></Link>
                <h1 className='text-[36px] font-bold underline underline-offset-2'>Chi tiết sản phẩm</h1>
            </section>
            <section className='flex gap-10'>
                <div>
                    {
                        loading? (
                            <Skeleton className='w-[480px] h-full bg-gray-500 rounded-[8px] shadow-md'/>
                        ) : (
                            <Dialog>
                              <DialogTrigger className='w-full h-full'>
                                <img src={product?.imageUrl} alt={product?.name} className='w-[640px] h-full object-cover rounded-[8px] shadow-md'/>
                              </DialogTrigger>
                              <DialogContent className='bg-white'>
                                <img src={product?.imageUrl} alt={product?.name} className='w-full h-full object-cover rounded-[8px] shadow-md'/>
                              </DialogContent>
                            </Dialog>
                        )
                    }
                </div>
                <div className='flex flex-col gap-4'>
                    {
                        loading? (
                            <Skeleton className='w-[480px] h-[36px] bg-gray-500 rounded-[8px] shadow-md'/>
                        ) : (
                            <h2 className='text-[36px] font-bold'>{product?.name}</h2>
                        )
                    }
                    {
                        loading? (
                            <Skeleton className='w-[120px] h-[36px] bg-gray-500 rounded-[8px] shadow-md'/>
                        ) : (
                           categoryBadge()
                        )
                    }
                    {
                        loading? (
                            <Skeleton className='w-[480px] h-[24px] bg-gray-500 rounded-[8px] shadow-md'/>
                        ) : (
                            <span className='flex flex-col'>
                              <p className='font-semibold underline'>Miêu tả sản phẩm:</p> <br />{product?.description}</span>
                        )
                    }
                    {
                        loading? (
                            <Skeleton className='w-[120px] h-[24px] bg-gray-500 rounded-[8px] shadow-md'/>
                        ) : (
                            <div className='flex items-center gap-4 '>
                                <span className='flex items-center gap-2'>
                                  <p className='font-semibold underline'>Số điểm đánh giá trung bình:</p> 
                                  {RatingToStars({rating: product?.totalRating})}
                                  {product?.totalRating}
                                </span>
                                <span className='flex items-center gap-2'>
                                  <p>(Số lượt đánh giá hiện có:</p> 
                                  <p>{feedbacks?.length}) </p>
                                </span>
                            </div>
                        )
                    }
                    {
                        loading? (
                            <Skeleton className='w-[120px] h-[24px] bg-gray-500 rounded-[8px] shadow-md'/>
                        ) : (
                            <span className='flex items-center gap-2 '>
                              <p className='font-semibold underline'>Giá tiền:</p> 
                                {product?.price.toLocaleString(
                                    'vi-VN',
                                    { style: 'currency', currency: 'VND' }
                                )}
                            </span>
                        )
                    }
                    {
                        loading? (
                            <Skeleton className='w-[240px] h-[24px] bg-gray-500 rounded-[8px] shadow-md'/>
                        ) : (
                            <div className='flex gap-4 items-center'>
                                <Link href={`/staff/products/${product?.productId}/edit`}>
                                    <Button variant="default" className="bg-purple-500 text-white hover:bg-purple-600 rounded-[4px] flex gap-4 items-center">
                                        Cập nhật
                                        <SquarePen size={24} />
                                    </Button>
                                </Link>
                                <Dialog>
                                  <DialogTrigger>
                                    <Button variant="default" className="bg-red-500 text-white hover:bg-red-600 rounded-[4px] flex gap-4 items-center">
                                        Xóa
                                        <Trash2 size={24} />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className='bg-white'>
                                    <DialogHeader>
                                      <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription>
                                      Bạn có chắc chắn muốn xóa sản phẩm này không?
                                    </DialogDescription>
                                    <div className='flex gap-4'>
                                      <Button
                                        onClick={() =>{
                                          deleteProduct(product?.productId || 0);
                                          window.location.href = '/staff/products';
                                        }}
                                        variant="default" 
                                        className="bg-red-500 text-white hover:bg-red-600 rounded-[4px] flex gap-4 items-center">
                                          Xác nhận
                                      </Button>
                                      <DialogClose asChild>
                                        <Button variant="default" className="bg-gray-500 text-white hover:bg-gray-600 rounded-[4px] flex gap-4 items-center">
                                            Hủy
                                        </Button>
                                      </DialogClose>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                            </div>
                        )
                    }
                </div>
            </section>
            <section>
                <h2 className='text-[36px] font-semibold underline undeline-offset-2'>Phản hồi từ người sử dụng</h2>
                <StaffProductFeedbackCard productId={params.id} />
            </section>
        </section>
    )
}

export default ProductDetailsPage
