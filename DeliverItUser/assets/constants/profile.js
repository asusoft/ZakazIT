import icons from './icons';
import images from './images';

const myProfile = {
    name: 'Abubakar',
    phone: '+79963570585',
    address: 'No. 88, Jln Padungan, Kuching',
  };

  const cardType = [
    {
        id: 1,
        name: 'Apple Pay',
        icon: icons.apple,
    },
    {
        id: 2,
        name: 'Visa',
        icon: icons.visa,
    },
    {
        id: 3,
        name: 'PayPal',
        icon: icons.mastercard,
    },
    {
        id: 4,
        name: 'Google Pay',
        icon: icons.google,
    },
    {
        id: 5,
        name: 'Master Card',
        icon: icons.mastercard,
    },
];

const myCards = [
    {
        id: 1,
        type: cardType[4],
        card_no: '1234',
    },
    {
        id: 2,
        type: cardType[1],
        card_no: '1234',
    },
    {
        id: 3,
        type: cardType[0],
        card_no: '1234',
    },
    {
        id: 4,
        type: cardType[3],
        card_no: '1234',
    }
];


export default {
    myCards,
    cardType,
    myProfile
}