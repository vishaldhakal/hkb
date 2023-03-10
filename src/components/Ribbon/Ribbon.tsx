import { Box } from '@mui/material';
import React from 'react';
import styles from './Ribbon.module.css';

type Props = {
  text: string;
};
// eslint-disable-next-line arrow-body-style
const Ribbon = ({ text }: Props) => {
  return (
    <Box className={`${styles.ribbon} ${styles.ribbon_top_left}`}>
      <Box component="span">{text}</Box>
    </Box>
  );
};

export default Ribbon;
