"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useSingleAccount } from "@/hooks/account/useAccount";

import { cn } from "@/lib/utils";

import React from 'react'

interface UserAvatarProps {
    accountId: number;
    className?: string;
}

const UserAvatar:React.FC<UserAvatarProps> = ({
    accountId,
    className
}) => {
    const { account, loading, error } = useSingleAccount(accountId);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            <Avatar className={cn(className)}>
                <AvatarImage src={account != null ? account.imageUrl : 'https://github.com/shadcn.png'} alt="@shadcn" />
                <AvatarFallback className="bg-pink-500 text-white">{account?.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default UserAvatar
