import { LineWave } from 'react-loader-spinner';

export function Loader({ visibility }) {
  return (
    <div
      className='d-flex align-items-center justify-content-center'
      style={{ height: '10vh' }}
    >
      <LineWave
        height='100'
        width='100'
        color='#4fa94d'
        ariaLabel='line-wave'
        wrapperClass={'loader ' + (visibility ? '' : 'opacity')}
        wrapperStyle={{
          backgroundColor: 'white',
          display: 'flex',
          alignText: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
          transform: 'translate(20%)',
        }}
        visible={visibility}
        firstLineColor='green'
        middleLineColor='blue'
        lastLineColor='red'
      />
    </div>
  );
}
