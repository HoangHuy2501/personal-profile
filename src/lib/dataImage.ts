import avatar from '../assets/image/avatar.jpg';
import mangden from '../assets/image/mangden.jpg';
import thacPaSy from '../assets/image/thacPaSy.jpg';
import chieuLieu from '../assets/image/chieuLieu.jpg';

export type PortfolioImage = { src: string; alt: string; label: string };

// Demo data: replace or extend this list with project/gallery images later.
export const dataImage: PortfolioImage[] = [
  { src: avatar.src, alt: 'Nguyen Hoang Huy portrait', label: 'Portrait' },
  { src: mangden.src, alt: 'Nguyen Hoang Huy mang den image', label: 'Mang Den' },
  { src: thacPaSy.src, alt: 'Nguyen Hoang Huy thac pa sy image', label: 'Thac Pa Sy' },
  { src: chieuLieu.src, alt: 'Nguyen Hoang Huy chieu lieu image', label: 'Chieu Lieu' },
];

export default dataImage;
