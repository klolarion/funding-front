import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  // 상태 관리
  const [product, setProduct] = useState({ productName: '', price: 0, stock: 0 });
  const [foundProduct, setFoundProduct] = useState(null);
  const [productId, setProductId] = useState('');

  const [fundingId, setFundingId] = useState('');
  const [foundFunding, setFoundFunding] = useState(null);

  const [memberId, setMemberId] = useState('');
  const [foundMember, setFoundMember] = useState(null);

  const [code, setCode] = useState({ code: '', description: '', reference: '' });
  const [codeList, setCodeList] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState({ codeId: '', accountNumber: '', availableAmount: 0 });
  const [paymentMethodList, setPaymentMethodList] = useState([]);

  // 이벤트 핸들링
  const handleInputChange = (e, setState) => {
    setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  // 상품 등록
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/product', product);
      alert('상품이 등록되었습니다.');
    } catch (error) {
      console.error('상품 등록 오류:', error);
    }
  };

  // 상품 조회
  const handleProductSearch = async () => {
    try {
      const response = await axios.get(`/admin/product?productId=${productId}`);
      setFoundProduct(response.data);
    } catch (error) {
      console.error('상품 조회 오류:', error);
    }
  };

  // 펀딩 조회
  const handleFundingSearch = async () => {
    try {
      const response = await axios.get(`/admin/funding?fundingId=${fundingId}`);
      setFoundFunding(response.data);
    } catch (error) {
      console.error('펀딩 조회 오류:', error);
    }
  };

  // 펀딩 업데이트 (종료, 삭제 등)
  const handleFundingUpdate = async (action) => {
    try {
      await axios.post(`/admin/funding/${action}`, { fundingId: foundFunding.fundingId });
      alert(`${action}가 완료되었습니다.`);
      setFoundFunding(null); // Clear after update
    } catch (error) {
      console.error(`${action} 오류:`, error);
    }
  };

  // 사용자 검색
  const handleMemberSearch = async () => {
    try {
      const response = await axios.get(`/admin/member?memberId=${memberId}`);
      setFoundMember(response.data);
    } catch (error) {
      console.error('사용자 조회 오류:', error);
    }
  };

  // 코드 등록
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/code', code);
      alert('코드가 등록되었습니다.');
      setCode({ code: '', description: '', reference: '' }); // 초기화
      fetchCodes(); // 새로 등록된 코드 리스트 갱신
    } catch (error) {
      console.error('코드 등록 오류:', error);
    }
  };

  // 코드 리스트 가져오기
  const fetchCodes = async () => {
    try {
      const response = await axios.get('/admin/code');
      setCodeList(response.data);
    } catch (error) {
      console.error('코드 리스트 조회 오류:', error);
    }
  };

  // 코드 삭제
  const handleCodeDelete = async (codeId) => {
    try {
      await axios.delete(`/admin/code/${codeId}`);
      alert('코드가 삭제되었습니다.');
      setCodeList(codeList.filter(c => c.codeId !== codeId)); // 리스트 갱신
    } catch (error) {
      console.error('코드 삭제 오류:', error);
    }
  };

  // 결제 수단 등록
  const handlePaymentMethodSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/paymentMethod', paymentMethod);
      alert('결제 수단이 등록되었습니다.');
      setPaymentMethod({ codeId: '', accountNumber: '', availableAmount: 0 }); // 초기화
      fetchPaymentMethods(); // 새로 등록된 결제 수단 리스트 갱신
    } catch (error) {
      console.error('결제 수단 등록 오류:', error);
    }
  };

  // 결제 수단 리스트 가져오기
  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get('/admin/paymentMethod');
      setPaymentMethodList(response.data);
    } catch (error) {
      console.error('결제 수단 리스트 조회 오류:', error);
    }
  };

  // 초기 로드 시 코드 및 결제 수단 리스트를 가져옴
  useEffect(() => {
    fetchCodes();
    fetchPaymentMethods();
  }, []);

  return (
    <div style={{ margin: '0 50px' }}>
      <div id="add-product">
        <h2>상품 등록</h2>
        <form onSubmit={handleProductSubmit}>
          <label>상품명</label>
          <input name="productName" value={product.productName} onChange={(e) => handleInputChange(e, setProduct)} /><br />
          <label>금액</label>
          <input type="number" name="price" value={product.price} onChange={(e) => handleInputChange(e, setProduct)} /><br />
          <label>재고</label>
          <input type="number" name="stock" value={product.stock} onChange={(e) => handleInputChange(e, setProduct)} /><br />
          <button type="submit">상품 등록</button>
        </form>

        <h2>상품 조회</h2>
        <input
          placeholder="Product ID"
          name="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          type="number"
        />
        <button onClick={handleProductSearch}>검색</button>

        {foundProduct && (
          <div id="product">
            <span>{foundProduct.productId}</span>
            <span>{foundProduct.productName}</span>
            <span>{foundProduct.price}</span>
            <span>{foundProduct.stock}</span>
            <span>{foundProduct.restock ? '재입고' : '미재입고'}</span>
            <span>{foundProduct.saleFinished ? '판매 종료' : '판매 중'}</span>
          </div>
        )}
      </div>

      <div>
        <h2>펀딩 조회</h2>
        <input
          placeholder="Funding ID"
          name="fundingId"
          value={fundingId}
          onChange={(e) => setFundingId(e.target.value)}
          type="number"
        />
        <button onClick={handleFundingSearch}>검색</button>

        {foundFunding && (
          <div>
            <span>{foundFunding.fundingId}</span>
            <span>{foundFunding.member.memberName}</span>
            <span>{foundFunding.product.productName}</span>
            <span>{foundFunding.totalFundingAmount}</span>
            <span>{foundFunding.currentFundingAmount}</span>
            <span>{foundFunding.completed ? '완료' : '진행 중'}</span>
            <span>{foundFunding.closed ? '종료' : '진행 중'}</span>
            <span>{foundFunding.deleted ? '삭제됨' : '활성'}</span>
            <button onClick={() => handleFundingUpdate('closed')}>펀딩 종료</button>
            <button onClick={() => handleFundingUpdate('delete')}>펀딩 삭제</button>
          </div>
        )}
      </div>

      <div>
        <h2>사용자 검색</h2>
        <input
          placeholder="Member ID"
          name="memberId"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          type="number"
        />
        <button onClick={handleMemberSearch}>검색</button>

        {foundMember && (
          <div>
            <span>{foundMember.memberName}</span>
            <span>{foundMember.email}</span>
            <button>정지</button>
          </div>
        )}
      </div>

      <div id="code">
        <div>
          <h2>코드 등록</h2>
          <form onSubmit={handleCodeSubmit}>
            <label>코드</label>
            <input type="number" name="code" value={code.code} onChange={(e) => handleInputChange(e, setCode)} /><br />
            <label>설명</label>
            <input name="description" value={code.description} onChange={(e) => handleInputChange(e, setCode)} /><br />
            <label>레퍼런스</label>
            <input name="reference" value={code.reference} onChange={(e) => handleInputChange(e, setCode)} /><br />
            <button type="submit">코드 등록</button>
          </form>
        </div>
        <div id="code-list">
          <h2>코드 리스트</h2>
          <div id="code-list-box">
            {codeList.map(code => (
              <div key={code.codeId}>
                <span>{code.codeId}</span>
                <span>{code.code}</span>
                <span>{code.description}</span>
                <span>{code.reference}</span>
                <button onClick={() => handleCodeDelete(code.codeId)}>삭제</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="payment-method">
        <div>
          <h2>결제 수단 등록</h2>
          <form onSubmit={handlePaymentMethodSubmit}>
            <label>코드 아이디</label>
            <input type="number" name="codeId" value={paymentMethod.codeId} onChange={(e) => handleInputChange(e, setPaymentMethod)} /><br />
            <label>계좌번호</label>
            <input name="accountNumber" value={paymentMethod.accountNumber} onChange={(e) => handleInputChange(e, setPaymentMethod)} /><br />
            <label>잔고</label>
            <input type="number" name="availableAmount" value={paymentMethod.availableAmount} onChange={(e) => handleInputChange(e, setPaymentMethod)} /><br />
            <button type="submit">결제 수단 등록</button>
          </form>
        </div>
        <div id="payment-list">
          <h2>결제 수단 리스트</h2>
          <div>
            {paymentMethodList.map(paymentMethod => (
              <div key={paymentMethod.paymentMethodId}>
                <span>{paymentMethod.paymentMethodId}</span>
                <span>{paymentMethod.paymentCode}</span>
                <span>{paymentMethod.paymentName}</span>
                <span>{paymentMethod.accountNumber}</span>
                <span>{paymentMethod.availableAmount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;