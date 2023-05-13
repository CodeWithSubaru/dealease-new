export function NotFound() {
  return (
    <div
      className='d-flex justify-content-center align-items-center bg-light'
      style={{ height: '100vh' }}
    >
      <div className='d-flex flex-column align-items-center'>
        <img src='/images/page/crying_fish.png' className='w-25 w-25 mb-4' />
        <h1
          className='text-secondary mb-0f fw-bold'
          style={{ fontSize: '90px' }}
        >
          404
        </h1>
        <p className='fs-4'> Sorry Url Not Found</p>
      </div>
    </div>
  );
}
