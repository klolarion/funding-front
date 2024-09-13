import axios from "axios";
import { FundingDto, JoinFundingDto, MyPageDto, ProductSearchDto } from "../types/types";

const fundingApi = axios.create({
    baseURL: "http://localhost:9091"
});

export const index = async () => {
    const response = await fundingApi.get<FundingDto[]>(`/api/f1/v1/index`);
    return response.data;
}

export const search = async (searchParam: string) => {
    const response = await fundingApi.get<ProductSearchDto[]>(`/api/f1/v1/search/naver/${encodeURIComponent(searchParam)}`)
    return response.data;
}

export const myPage = async () => {
    const response = await fundingApi.get<MyPageDto>(`/api/f2/v1/mypage`);
    return response.data;
}

export const fundingDetail = async (fundingId: string) => {
    const response = await fundingApi.get<FundingDto>(`/api/f2/v1/funding/${encodeURIComponent(fundingId)}`)
    return response.data;
}

export const joinFunding = async (joinFundingDto: JoinFundingDto) => {
    const response = await fundingApi.put(`/api/f2/v1/funding`, joinFundingDto, {
        headers: {
          'Content-Type': 'application/json',
        },})
    return response.data;
}