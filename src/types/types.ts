export interface ProductSearchDto {
    title: string,
    link: string,
    image: string,
    lprice: number,
    mallname: string,
    productId: number,
    productType: number,
    category1: string,
    category2: string,
    category3: string,
}

export interface FundingDto{
     fundingId: number;
     memberId: number;
     groupId?: number;
     groupName?: string;
     memberName: string;
     productId: number;
     productName: string;
     travelId?: number;
     travelName?: string;
     progress: number;
     totalFundingAmount: number;
     currentFundingAmount: number;
     fundingAccount: string;
     status: string;
     fundingCategoryCode: number;
}

export interface MyPageDto{
 fundingListDtos: FundingDto[];
 myMainPaymentMethod: PaymentMethod;
 memberDto: MemberDto;
 myActivity: MyActivity;
}

export interface PaymentMethodList{
    paymentMethodListId: number;
    paymentMethod: PaymentMethod;
    mainPayment: boolean;
    offCd: boolean;

}
export interface GroupDto{
 groupId: number;
 groupLeaderId: number;
 groupLeaderName: string;
 groupName: string;
 groupMemberCount: number;
 groupCategoryCode: number;
//  groupFunding: Funding[];

}
export interface Payment{
    paymentId: number;
    paymentMethod: PaymentMethod;

    targetAccount: string;
    paymentAccount: string;
    amount: number;
    balanceBefore: number;
    balanceAfter: number;

    completed: boolean;
}

export interface MyActivity{
    myFundingCount: number;
    fundingAmount: number;
    createdGroupCount: number;
    joinedGroupCount: number;
}


export interface MemberDto{
    memberId: number;
    account: string;
    email: string;
    memberName: string;

    memberStatus: number;

    provider: string; //공급자 (google, facebook ...)
    providerId: string; //공급 아이디 ?

    enabled: boolean;
    banned: boolean;
}

export interface PaymentMethod{
    paymentMethodId: number;
    paymentCode: number;
    paymentName: string;
    accountNumber: string;
    availableAmount: number;
}

export interface JoinFundingDto{
    fundingId: number,
    amount: number,
    memberId: number,
    groupId: number,
    paymentMethodListId: number,
}