"use client";
import React from "react";

import { useFeedbackMediaList } from "@/hooks/feedback/feedbackMedia";
import { deleteFeedback, useFeedbacksByProduct } from "@/hooks/feedback/feedback";

import { useSingleAccount } from "@/hooks/account/useAccount";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Star } from "lucide-react";
import UserAvatarWithText from "@/components/shared/user/user-avatar-with-text";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface FeedbackProductCardProps {
  productId: number;
}

const StaffProductFeedbackCard: React.FC<FeedbackProductCardProps> = ({
  productId,
}) => {
  const { feedbacks, loading, error } = useFeedbacksByProduct(productId); //Get feedbacks by product id
  const { feedbackMediaList } = useFeedbackMediaList(); //Get feedback media list

  //Get feedback media for each feedback
  const getFeedbackMedia = (feedbackId: number) => {
    const fmlProduct = feedbackMediaList.filter(
      (media) => media.feedbackId === feedbackId
    );
    fmlProduct.forEach((element) => {
      console.log(element.mediaUrl);
    });
    return fmlProduct;
  };

  const handleDeleteFeedback = (feedbackId: number) => {
    deleteFeedback(feedbackId);
  }

  function ratingToStars(rating: number) {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<Star size={24} color="yellow" />);
    }
    return stars;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <section className="flex flex-col">
      {feedbacks.map((feedback) => (
        <Card key={feedback.feedbackId} className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <UserAvatarWithText accountId={feedback.accountId} />
            </CardTitle>
            <CardDescription className="w-full">
              {feedback.content}
              <div className="flex gap-2 py-2">
                {getFeedbackMedia(feedback.feedbackId).map((media) => (
                  <div key={media.feedbackMediaId}>
                    {/* <Image src={media.mediaUrl} alt={media.feedbackMediaId.toString()} layout="fill" objectFit="cover" /> */}
                    <img
                      src={
                        "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={media.feedbackMediaId.toString()}
                      className="w-40 h-40 object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-end gap-2">
            <div className="flex items-center">
              {ratingToStars(feedback.rating)}
            </div>
            <p className="text-xs">({feedback.rating})</p>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <Button className="bg-pink-500 hover:bg-pink-600 rounded-[4px] text-white">
              Xem chi tiết
            </Button>
            <Dialog>
              <DialogTrigger>
                <Button
                  variant="default"
                  className="bg-red-500 text-white hover:bg-red-600 rounded-[4px] flex gap-4 items-center"
                >
                  Cắm cờ bình luận
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Xác nhận cắm cờ</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <p>Một khi bạn cắm cờ, người dùng với tài khoản này sẽ bị cảnh cáo, và bình luận của họ cũng sẽ bị xóa</p>
                    <p>Bạn có chắc chắn muốn cắm cờ bình luận này?</p>
                </DialogDescription>
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                        handleDeleteFeedback(feedback.feedbackId);
                      window.location.href = `/staff/products/${productId}`;
                    }}
                    variant="default"
                    className="bg-red-500 text-white hover:bg-red-600 rounded-[4px] flex gap-4 items-center"
                  >
                    Xác nhận
                  </Button>
                  <DialogClose asChild>
                    <Button
                      variant="default"
                      className="bg-gray-500 text-white hover:bg-gray-600 rounded-[4px] flex gap-4 items-center"
                    >
                      Hủy
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default StaffProductFeedbackCard;
