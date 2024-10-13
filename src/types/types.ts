export interface ProductSearchDto {
    title: string,
    link: string,
    image: string,
    lprice: number,
    mallName: string,
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
     nickName: string;
     productId: number;
     productName: string;
     progress: number;
     totalFundingAmount: number;
     currentFundingAmount: number;
     fundingAccount: string;
     status: string;
     fundingCategoryCode: number;
}

export interface MyPageDto{
 fundingListDtos: FundingDto[];
 mainPaymentMethodDto: PaymentMethod;
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
    memberId: number,
    role: string,
    email: string,

    nickName: string,

    provider: string, //공급자 (google, facebook ...)

    enabled: boolean,
    banned: boolean,

    memberStatus: string,
    memberStatusCode: number,
    statusExpires: Date,
}

export interface PaymentMethod{
    paymentMethodListId: number,
    paymentMethodId: number,
    paymentMethodName: string,
    paymentMethodAccountNumber: string,
    memberId: number,
    mainPayment: boolean,
    availableAmount: number,
}

export interface JoinFundingDto{
    fundingId: number,
    amount: number,
    memberId: number,
}

export interface MyPaymentMethodList{
    paymentMethodLists: PaymentMethod[];
    paymentMethods: PaymentMethodDto[];
    mainPaymentMethod: PaymentMethod;
}

export interface PaymentMethodDto{
    paymentCode: number,
    paymentMethodId: number,
    paymentName: string,
    accountNumber: string,
    availableAmount: number
}

export interface PaymentDto{
    paymentId: number;
    memberId: number;
    paymentAccount: string;
    paymentMethodName: string;
    targetAccount: string;
    amount: number;
    balanceBefore: number;
    balanceAfter: number;
    createDate: string;

}

export interface GroupPageDto{
    createdGroup: GroupDto[],
    assignedGroup: GroupDto[],
}

export interface GroupDto{
    groupId: number;
    groupLeaderId: number;
    groupLeaderName: string;
    groupName: string;
    groupMemberCount: number;
    groupCategoryCode: number;
    groupFunding: [];
}