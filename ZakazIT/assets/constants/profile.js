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
        name: 'Visa',
        icon: icons.visa,
        image: images.visa_card
    },
    {
        id: 2,
        name: 'Mir',
        icon: icons.mir,
        image: images.mir_card
    },
    {
        id: 3,
        name: 'Master Card',
        icon: icons.mastercard,
        image: images.master_card
    },
];

const myCards = [
    {
        id: 1,
        type: cardType[2],
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
    }
];


export default {
    myCards,
    cardType,
    myProfile
}