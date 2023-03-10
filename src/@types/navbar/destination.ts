export interface DestinationProps {
  id: number | string;
  name: string;
  destination_small_detail: string;
  destination_detail: string;
  thumbnail_image: string;
  thumbnail_image_alt_description: string;
}

export type DestinationNavProps = {
  title: string;
  children: DestinationProps[];
};
