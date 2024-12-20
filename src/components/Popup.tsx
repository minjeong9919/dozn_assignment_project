interface PropsType {
  onClose: (open: boolean) => void;
}

export const Popup = ({ onClose }: PropsType) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div>
        <h2>모달 제목</h2>
        <p>모달에 대한 내용</p>
        <button onClick={() => onClose(false)}>닫기</button>
      </div>
    </div>
  );
};
