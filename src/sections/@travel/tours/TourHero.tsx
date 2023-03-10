// @mui
// utils
// components
import { Image } from '../../../components';
import { ngrokapi } from '../../../config';
import { EachActivityProps } from '../../../@types/travel';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  activity: EachActivityProps;
};

export default function TourHero({ activity }: Props) {
  const { heroImg, slug } = activity;

  return (
    <>
      <Image alt={slug} src={ngrokapi + heroImg} sx={{ maxWidth: 1, maxHeight: '70vh' }} />
    </>
  );
}
