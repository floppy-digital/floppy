import axios from 'axios';
import { Color, Solver } from './colorSolver';
import { fontNames, getFontName } from './fonts';

const corsAssetURL = '/api/image'; // proxied from server
const assetBaseURL = 'https://dg3mov3znt8u.cloudfront.net/upload';

const moralisGateway = 'https://gateway.moralisipfs.com/ipfs';

const CANVAS_HEIGHT = window.innerWidth / 2.25;

const downloadWAV = async (url, name) => {
  const { data } = await axios.post('/api/ipfs/fetch', { url });
  const a = document.createElement('a');
  a.setAttribute('href', `data:audio/wav;base64, ${data}`);
  a.download = `${name}.wav`;
  a.click();
  a.remove();
};

const wallets = [
  '0xE4A2F9908F336BBD306C1c0C2eFbDDB57c52280D',
  '0x69f58849e6B02bE752C86161eAe99Cb08ed1Ef81',
  '0x7761CA398E836534bEd3B8798f96A3CF39D3bD2E',
  '0xF391EEe70A073e9ed53EBD3b9836644FdFe1b7C6',
  '0x45FC43177EB8D9105d28d13Ce95133845a7D163F',
  '0xe612d9C2a9bA0Ff4403F4f7Ea87D5bE4290aC7B9',
  '0xce4462480872e27cAc6997e28a6fb1988a377728',
  '0x1B383F5edf0E48Eb8F366043AC9841DdB5363cde',
  '0x3e5648f9eB33421Ea732E87f814D4452B91bF284',
  '0xA89A23280E10494dd741C223deCDEEeF0AA887A8',
  '0x13ED8515eA47b0B2dc20c7478F839E92b48f6A3b',
  '0xBbBFae367A498586173Fb52EfA86f10fBAa8191c',
  '0xA1ad82169A88D96EE14a8e22aA2F09d4596303df',
  'floriandeitermann.eth',
  '0x45CcFE16bC2AC8CEF704a7236fEf3E5f4222dE15',
  '0xC3aF8EfE3c865b8363A79B13B27dB530Eb5D24Af',
  '0xb97A251dF2672b0e252b28a96857A8ACE9929CCc',
  '0x54DB0e6BA08a705057BAB04d68eCd3Fd004d0Dee',
  '0x8deDeA15234d555ee9110e2C0446438D4185e8b7',
  '0x21844640138A348474064180C93AD82f50c89357',
  '0x21dB94192456295Dd4Bd7136580f1877264FAAFd',
  '0x692e85F4585d7408D2a1ba1F8C428ffD294101F6',
  '0xB00A93fF31217E49c3674e05b525f239a85bb78f',
  '0x9bc9A0eb9FAFe9014ddC6Ab1A3Cd661F585a5641',
  '0x416703760748c10fe96311ac2391B0817eeB4C58',
  '0x45d2baFe56c85433e0b9f9b50dd124ea3041f223',
  '0x5090c4Fead5Be112b643BC75d61bF42339675448',
  '0x01A1A79E83e26A9DE566F65A1AcDf02DeC449D26',
  '0x009f35a701a029B535d1bb0E43A92a9908eF740D',
  '0x00c01F230B9a9c6113E28cDD16a395B9658fbD1F',
  '0xbd5de08152cd8f8f91d3b3570a231c66f299475e',
  '0x9E389b0b33b093c4Cd50c67a702335965A286507',
  '0x63aC987cE0A27F7fCDFc7dE87F3305dbd2B51473',
  '0x4718ce007293bCe1E514887E6F55ea71d9A992d6',
  '0x1D751999d27F4EB8E48A280075dCdcE546078fbd',
  '0x0a7c3007f2156ff8db9579efb7adbbd7212d3c3c',
  '0xfeCC5C3b38fbfe8b0Da0Ace60875D33c8351Ee85',
  '0x0E696712DaDEd627f370Ec9Bbf9F7931cf19863D',
  '0x1d14d9e297dfbce003f5a8ebcf8cba7faee70b91',
  '0x89f606eec3fc99ed4ce78bbf4e378bacaa0b458f',
];

export {
  Color,
  Solver,
  fontNames,
  getFontName,
  downloadWAV,
  moralisGateway,
  corsAssetURL,
  assetBaseURL,
  wallets,
  CANVAS_HEIGHT,
};
