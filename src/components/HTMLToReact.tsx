/**
 * Works in Next.js 10.x
 */
import React from 'react';
import parse, {
  domToReact,
  attributesToProps,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser';
import quotesIcon from '@iconify/icons-carbon/quotes';

import okaidia from 'prism-react-renderer/themes/okaidia';
import { Link, Stack, Typography, TypographyProps } from '@mui/material';
import { Image } from '../components';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { styled } from '@mui/material/styles';
import { PlayerWithImage } from './player';
import Iconify from './Iconify';
import { ngrokapi } from '../config';
import { FONT_PRIMARY } from '../theme/typography';
type RootStyleProps = {
  firstLetter?: boolean;
};
const MARGIN = {
  marginTop: 4,
  marginBottom: 16,
};
export const RootStyle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'firstLetter',
})<RootStyleProps>(({ firstLetter, theme }) => ({
  // Heading
  '& h1': { ...MARGIN, ...theme.typography.h1 },
  '& h2': { ...MARGIN, ...theme.typography.h2 },
  '& h3': { ...MARGIN, ...theme.typography.h3 },
  '& h4': { ...MARGIN, ...theme.typography.h4 },
  '& h5': { ...MARGIN, ...theme.typography.h5 },
  '& h6': { ...MARGIN, ...theme.typography.h6 },
  '& span': {
    fontFamily: `${FONT_PRIMARY} !important `,
    marginBottom: theme.spacing(0),
  },
  '& font': {
    fontFamily: `${FONT_PRIMARY} !important `,
    marginBottom: theme.spacing(0),
  },
  '& p': {
    marginBottom: theme.spacing(2),
    '& > span': {
      fontFamily: `${FONT_PRIMARY} !important `,
    },
  },
  // Code
  '& code': {
    color: theme.palette.secondary.main,
  },

  '& pre': {
    margin: theme.spacing(1, 0),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[900],
    '& > pre': {
      overflow: 'auto',
      padding: theme.spacing(3),
    },
  },

  // List
  '& ul, & ol': {
    marginBottom: theme.spacing(2),
    '& li': {
      lineHeight: 2,
    },
  },

  // First Letter
  ...(firstLetter && {
    '& > p:first-of-type': {
      '&:first-letter': {
        float: 'left',
        fontSize: 80,
        lineHeight: 1,
        paddingRight: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  }),
}));

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    const typedDomNode = domNode as Element;

    if (typedDomNode.attribs && typedDomNode.name === 'a') {
      return (
        <Link {...attributesToProps(typedDomNode.attribs)} target="_blank" underline="none">
          {typedDomNode.children && domToReact(typedDomNode.children, options)}
        </Link>
      );
    }
    if (typedDomNode.attribs && typedDomNode.name === 'font') {
      console.log(typedDomNode);
      return (
        <Typography>
          {typedDomNode.children && domToReact(typedDomNode.children, options)}
        </Typography>
      );
    }
    if (typedDomNode.attribs && typedDomNode.name === 'img') {
      if (typedDomNode.attribs.src.startsWith('/media')) {
        return (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image src={`${ngrokapi + typedDomNode.attribs.src}`} ratio="16/9" />
        );
      } else null;
    }

    if (
      typedDomNode.attribs &&
      typedDomNode.name === 'pre' &&
      typedDomNode.firstChild &&
      (typedDomNode.firstChild as any).name === 'code'
    ) {
      const node = typedDomNode.firstChild as any;
      return <CodeMDX className={node.attribs.class} children={(node.children[0] as any).data} />;
    }
    if (typedDomNode.attribs && typedDomNode.name === 'oembed') {
      return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <PlayerWithImage
          imgPath="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wHfq?ver=f585"
          videoPath={typedDomNode.attribs.url}
        />
      );
    }
    if (typedDomNode.attribs && typedDomNode.name === 'blockquote') {
      const data = ((typedDomNode.firstChild as any).firstChild as any).data;
      return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <BlockquoteMDX children={data} />
      );
    }

    return false;
  },
};
type Props = {
  firstLetter?: boolean;
  html: string;
};
export default function HTMLToReact({ html, firstLetter = false }: Props) {
  return (
    <RootStyle firstLetter={firstLetter} sx={{}}>
      {parse(html, options)}
    </RootStyle>
  );
}

type CodeMDXProps = {
  children: string;
  className?: string;
};

function CodeMDX(props: CodeMDXProps) {
  const { children, className } = props;
  const language = className?.replace(/language-/, '') as Language;
  return (
    <Highlight {...defaultProps} code={children} theme={okaidia} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            padding: '2rem 1rem',
            overflow: 'auto',
            width: '100%',
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

function BlockquoteMDX(props: TypographyProps) {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 3, md: 5 }}
      sx={{
        my: 2,
        p: { xs: 3, md: 5 },
      }}
    >
      <Iconify
        icon={quotesIcon}
        sx={{ width: 48, height: 48, color: 'text.disabled', opacity: 0.48 }}
      />
      <Typography variant="h5">{props.children}</Typography>
    </Stack>
  );
}
