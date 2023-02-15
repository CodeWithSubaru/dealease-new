import { LineWave } from 'react-loader-spinner';

export function Loader({ visibility }) {
  return (
    <div>
      <LineWave
        height='100'
        width='100'
        color='#4fa94d'
        ariaLabel='line-wave'
        wrapperStyle={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'white',
          position: 'absolute',
          zIndex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        visible={visibility}
        firstLineColor='green'
        middleLineColor='blue'
        lastLineColor='red'
      />
    </div>
  );
}
