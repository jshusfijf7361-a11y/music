export interface PrimacyImage {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  // Tiered optimized URLs
  thumbnailUrl: string; // Small thumbnail (~320w)
  mediumUrl: string;    // Mobile / tablet (~640w)
  previewUrl: string;   // High quality preview (~1024w)
  fullUrl: string;      // High-resolution original (~1920w+)
  fallbackUrl: string;
  srcSet: string;
  srcSetPreview: string;
  alt: string;
}

export const PRIMACIES_IMAGES: PrimacyImage[] = [
  {
    id: 'primacy-1',
    order: 1,
    title: 'Foundation Academy Primacies I',
    subtitle: 'Institutional Vision & Core Pedagogy',
    thumbnailUrl: 'https://i.imgur.com/AHd95j7m.jpeg',
    mediumUrl: 'https://i.imgur.com/AHd95j7l.jpeg',
    previewUrl: 'https://i.imgur.com/AHd95j7h.jpeg',
    fullUrl: 'https://i.imgur.com/AHd95j7.jpeg',
    fallbackUrl: 'https://imgur.com/AHd95j7.jpg',
    srcSet: 'https://i.imgur.com/AHd95j7l.jpeg 640w, https://i.imgur.com/AHd95j7h.jpeg 1024w, https://i.imgur.com/AHd95j7.jpeg 1920w',
    srcSetPreview: 'https://i.imgur.com/AHd95j7l.jpeg 640w, https://i.imgur.com/AHd95j7h.jpeg 1024w',
    alt: 'Foundation Academy Primacies - First Edition',
  },
  {
    id: 'primacy-2',
    order: 2,
    title: 'Foundation Academy Primacies II',
    subtitle: 'Artist Development & Creative Mastery',
    thumbnailUrl: 'https://i.imgur.com/VMc2CYqm.jpeg',
    mediumUrl: 'https://i.imgur.com/VMc2CYql.jpeg',
    previewUrl: 'https://i.imgur.com/VMc2CYqh.jpeg',
    fullUrl: 'https://i.imgur.com/VMc2CYq.jpeg',
    fallbackUrl: 'https://imgur.com/VMc2CYq.jpg',
    srcSet: 'https://i.imgur.com/VMc2CYql.jpeg 640w, https://i.imgur.com/VMc2CYqh.jpeg 1024w, https://i.imgur.com/VMc2CYq.jpeg 1920w',
    srcSetPreview: 'https://i.imgur.com/VMc2CYql.jpeg 640w, https://i.imgur.com/VMc2CYqh.jpeg 1024w',
    alt: 'Foundation Academy Primacies - Second Edition',
  },
  {
    id: 'primacy-3',
    order: 3,
    title: 'Foundation Academy Primacies III',
    subtitle: 'Global Excellence & Future Leadership',
    thumbnailUrl: 'https://i.imgur.com/zftrNSkm.jpeg',
    mediumUrl: 'https://i.imgur.com/zftrNSkl.jpeg',
    previewUrl: 'https://i.imgur.com/zftrNSkh.jpeg',
    fullUrl: 'https://i.imgur.com/zftrNSk.jpeg',
    fallbackUrl: 'https://imgur.com/zftrNSk.jpg',
    srcSet: 'https://i.imgur.com/zftrNSkl.jpeg 640w, https://i.imgur.com/zftrNSkh.jpeg 1024w, https://i.imgur.com/zftrNSk.jpeg 1920w',
    srcSetPreview: 'https://i.imgur.com/zftrNSkl.jpeg 640w, https://i.imgur.com/zftrNSkh.jpeg 1024w',
    alt: 'Foundation Academy Primacies - Third Edition',
  },
];
