"use client"

import { useState, useEffect } from "react";

type Province = {
    province_id: number;
    province_name: string;
    province_type: string;
};

type District = {
    district_id: number;
    district_name: string;
};

type Ward = {
    ward_id: number;
    ward_name: string;
};

/**
 * Get all provinces in Vietnam
 * @returns list of provinces
 */
export const useProvinces = () => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch("https://vapi.vnappmob.com/api/province/")
            .then((res) => res.json())
            .then((data) => {
                setProvinces(data.results);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { provinces, loading, error };
}
/**
 * Get all districts in a province by provinceId
 * @param provinceId 
 * @returns list of districts in a province
 */
export const useDistricts = (provinceId: number) => {
    const [districts, setDistricts] = useState<District[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
            .then((res) => res.json())
            .then((data) => {
                setDistricts(data.results);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [provinceId]);

    return { districts, loading, error };
}

/**
 * Get all wards in a district by districtId
 * @param districtId 
 * @returns list of wards in a district
 */
export const useWards = (districtId: number) => {
    const [wards, setWards] = useState<Ward[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
            .then((res) => res.json())
            .then((data) => {
                setWards(data.results);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [districtId]);

    return { wards, loading, error };
}