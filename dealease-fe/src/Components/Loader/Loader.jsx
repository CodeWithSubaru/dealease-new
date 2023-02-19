import { LineWave } from 'react-loader-spinner';

export function Loader({ visibility }) {
  return (
    <div>
      <LineWave
        height='200'
        width='100'
        color='#4fa94d'
        ariaLabel='line-wave'
        wrapperStyle={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          zIndex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
        visible={visibility}
        firstLineColor='green'
        middleLineColor='blue'
        lastLineColor='red'
      />
    </div>
  );
}
