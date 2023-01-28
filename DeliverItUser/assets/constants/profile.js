import icons from './icons';

const myProfile = {
    name: 'Abubakar',
    phone: '+79963570585',
    address: 'No. 88, Jln Padungan, Kuching',
  };

const myCards = [
    {
        id: 1,
        name: 'Master Card',
        icon: icons.mastercard,
        card_no: '1234',
    },
    {
        id: 2,
        name: 'Google Pay',
        icon: icons.google,
        card_no: '1234',
    },
    {
        id: 3,
        name: 'Apple Pay',
        icon: icons.apple,
        card_no: '1234',
    },
    {
        id: 4,
        name: 'Visa',
        icon: icons.visa,
        card_no: '1234',
    },
];

const allCards = [
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

export default {
    myCards,
    allCards,
    myProfile
}