import { ReactNode } from 'react';
// next
import dynamic from 'next/dynamic';
import { ActivitiesSearchProps } from '../@types/travel';
import { NavItemProps } from '../@types/layout';
//
const Header = dynamic(() => import('./header/Header'), { ssr: false });
const HeaderSimple = dynamic(() => import('./header/HeaderSimple'), { ssr: false });
const Footer = dynamic(() => import('./footer/Footer'), { ssr: false });
const FooterSimple = dynamic(() => import('./footer/FooterSimple'), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  transparentHeader?: boolean;
  disabledHeader?: boolean;
  disabledFooter?: boolean;
  simpleHeader?: boolean;
  simpleFooter?: boolean;
  activities_search?: ActivitiesSearchProps[];
  navConfig?: NavItemProps[];
};

export default function Layout({
  children,
  transparentHeader,
  disabledHeader,
  activities_search,
  disabledFooter,
  simpleHeader,
  navConfig,
  simpleFooter,
}: Props) {
  return (
    <>
      {disabledHeader ? null : (
        <>
          {simpleHeader ? (
            <HeaderSimple transparent={transparentHeader} />
          ) : (
            <>
              <Header
                transparent={transparentHeader}
                activities_search={activities_search}
                navConfig={navConfig}
              />
            </>
          )}
        </>
      )}

      {children}

      {disabledFooter ? null : <>{simpleFooter ? <FooterSimple /> : <Footer />}</>}
    </>
  );
}
