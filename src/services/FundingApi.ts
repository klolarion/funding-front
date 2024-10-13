import axios from "axios";
import { FundingDto, GroupDto, JoinFundingDto, MyPageDto, MyPaymentMethodList, PaymentDto, ProductSearchDto } from "../types/types";

const fundingApi = axios.create({
    baseURL: "http://localhost:9091"
});

export const index = async () => {
    const response = await fundingApi.get<FundingDto[]>(`/api/f1/v1/index`, {
        headers: {
          'Content-Type': 'application/json',
        },});
    return response.data;
}

export const search = async (searchParam: string) => {
    const response = await fundingApi.get<ProductSearchDto[]>(`/api/f1/v1/search/naver/${encodeURIComponent(searchParam)}`, {
        headers: {
          'Content-Type': 'application/json',
        },})
    return response.data;
}

export const myPage = async () => {
    const response = await fundingApi.get<MyPageDto>(`/api/f2/v1/my-page`);
    return response;
}

export const fundingDetail = async (fundingId: string) => {
    const response = await fundingApi.get<FundingDto>(`/api/f2/v1/funding/${encodeURIComponent(fundingId)}/detail`, {
        headers: {
          'Content-Type': 'application/json',
        },})
    return response.data;
}

export const joinFunding = async (joinFundingDto: JoinFundingDto) => {
    const response = await fundingApi.put(`/api/f2/v1/funding`, joinFundingDto, {
        headers: {
          'Content-Type': 'application/json',
        },})
    return response.data;
}

export const searchFunding = async (searchParam: string, fundingCategoryCode: number) => {
    const response = await fundingApi.get<FundingDto[]>(
        `/api/f2/v1/funding/${ encodeURIComponent(searchParam)}/search`, 
        {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                fundingCategoryCode: encodeURIComponent(fundingCategoryCode),
            },
        }
       )
    return response; 
}

export const myPaymentMethod = async () => {
    const response = await fundingApi.get<MyPaymentMethodList>(`/api/f2/v1/payment/method`, {
        headers: {
          'Content-Type': 'application/json',
        },})
    return response;
}


export const setMainPaymentMethod = async (paymentMethodListId: number) => {
    const response = await fundingApi.put(`/api/f2/v1/payment/method/${encodeURIComponent(paymentMethodListId)}`, {
        headers: {
          'Content-Type': 'application/json',
        },})
    return response;
}

export const addToMyPaymentMethod = async (paymentMethodListId: number) => {
    const response = await fundingApi.post(`/api/f2/v1/payment/method/${encodeURIComponent(paymentMethodListId)}`, {
        headers: {
          'Content-Type': 'application/json',
        },})
    return response;
}

export const removeFromMyPaymentMethod = async (paymentMethodListId: number) => {
    const response = await fundingApi.delete(`/api/f2/v1/payment/method/${encodeURIComponent(paymentMethodListId)}`, {
        headers: {
          'Content-Type': 'application/json',
        },})
    return response;
}

export const getMyPayments = async () => {
    const response = await fundingApi.get<PaymentDto[]>(`/api/f2/v1/payment`, {
        headers: {
          'Content-Type': 'application/json',
        },})
    
    return response;
}

export const getMyGroups = async () => {
    const response = await fundingApi.get<GroupDto[]>(`/api/f2/v1/group`, {
        headers: {
          'Content-Type': 'application/json',
        },})
    
    return response;
}